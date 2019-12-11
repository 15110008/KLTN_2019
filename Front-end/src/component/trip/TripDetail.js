import React, { Component } from 'react'
import CardSwap from './CardSwap_v2'
import axios from 'axios';
import { Tabs, Card, PageHeader, Form, Timeline, Tooltip, Icon } from 'antd';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import DroppableCard from './DroppableCard';
import styled from 'styled-components'
import _ from 'lodash'
import './style.scss'

const { TabPane } = Tabs;


const Container = styled.div`
  margin: 8px;
  border: 1px solid #3897f1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: #3897f1
`


export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataRemain: []
        }
        this.id = this.props.match.params && this.props.match.params.id
    }
    componentDidMount() {
        this.loadData(this.id)
    }

    async loadData(id) {
        await axios({
            url: 'http://localhost:3000/v1/trip/' + id,
            method: 'get'
        })
            .then(async (res) => {
                if (res.data.success) {
                    const data = res.data.meta
                    const allTrip = []
                    data.map(x => {
                        x.listPlaces.map(place => {
                            allTrip.push({
                                id: place.id, name: place.name
                            })
                        })
                    })
                    this.setState({
                        data: data,
                        allTrip: allTrip,
                        title: res.data.result.name,
                        dateFrom: data[0].date,
                        dateTo: data[data.length - 1].date,
                    })
                }
            }).catch((err) => {
            })

    }

    onEdit() {
        window.location.replace("http://localhost:3006/trip-edit_v2/" + this.id)
    }

    render() {
        const { data, dataRemain } = this.state
        return (
            <div style={{
                background: 'rgba(0, 0, 0, 0.02)'
            }}>
                <div style={{ paddingTop: 100, paddingBottom: 30 }}>
                    <div style={{ padding: `0px 50px` }}>
                        <div className='row' style={{ marginBottom: '-35px' }}>
                            <div className='col-md-12' style={{ padding: 'unset' }}>
                                <PageHeader
                                    style={{
                                        border: '1px solid rgb(235, 237, 240)',
                                        borderBottomStyle: 'none',
                                        background: 'white',
                                    }}
                                    onBack={() => window.history.back()}
                                    title={
                                        <span>
                                            {this.state.title}
                                            <span style={{
                                                position: 'absolute',
                                                top: '25px',
                                                right: '25px'
                                            }}><button className='btn btn-edit' onClick={() => this.onEdit()}> <Icon style={{ position: 'absolute', top: 13, left: 10 }} type="setting" />Chỉnh sửa</button></span>
                                        </span>
                                    }
                                    subTitle={this.state.dateFrom + ' - ' + this.state.dateTo}
                                />
                                <div style={{ overFlowX: 'auto', background: '#fff', marginTop: -10 }}>
                                    <div className='container' style={{ paddingTop: 20 }} >
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                            {this.state.data.map(x => {
                                                return <div style={{ marginRight: 70 }}>
                                                    <h3>Ngày {x.day}</h3>
                                                    <Timeline>
                                                        {x.listPlaces.map(place => {
                                                            return <Timeline.Item>{place.name}</Timeline.Item>
                                                        })}
                                                    </Timeline>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ background: '#fff', marginTop: 30 }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        {this.state.data.map((x, dragIndexParent) => {
                                            return <div style={{ width: 300 }}>
                                                <Container>
                                                    <Title>Ngày {x.day} ({x.date})</Title>
                                                    {x.listPlaces.map((place, index) => {
                                                        let length = x.listSpot[index] && x.listSpot[index].length
                                                        let stayTime = x.listSpot[index] && x.listSpot[index].stayTime
                                                        let spotTime = x.listSpot[index] && x.listSpot[index].spotTime
                                                        let hoursStay = null
                                                        let hoursSpot = null
                                                        let minutesStay = null
                                                        let minutesSpot = null
                                                        if (stayTime) {
                                                            hoursStay = Math.floor(stayTime / 60);
                                                            minutesStay = stayTime % 60;
                                                        }
                                                        if (spotTime) {
                                                            hoursSpot = Math.floor(spotTime / 60);
                                                            minutesSpot = spotTime % 60;
                                                        }
                                                        if (index != x.listPlaces.length - 1) {
                                                            return (
                                                                <div className='card-swap'>
                                                                    <Card
                                                                        style={{ height: 105, borderRadius: '5px', boxShadow: '0 3px 6px 0 rgba(0,0,0,0.16)' }}>
                                                                        <span>
                                                                            <img alt="picture"
                                                                                style={{ width: 100, height: 105 }} src={place.image ? ("http://localhost:3000/" + place.image) : ''} />
                                                                        </span>

                                                                        <span >
                                                                            <Tooltip placement="top" title={place.name}>
                                                                                <div style={{ marginTop: -10, fontSize: 19, fontWeight: 'bold', paddingBottom: 5, position: 'absolute', top: 30, left: 115, }}>
                                                                                    {_.truncate(place.name, {
                                                                                        'length': 15,
                                                                                        'separator': " "
                                                                                    })}
                                                                                </div>
                                                                            </Tooltip>
                                                                            <span className='spot-time' style={{ color: 'red', paddingLeft: 'unset', position: 'absolute', top: 0, right: 5, fontSize: 14 }}>{x.listSpot[index] && x.listSpot[index].startTime}</span>
                                                                            <div style={{
                                                                                position: 'absolute',
                                                                                top: '50px',
                                                                                left: '115px'
                                                                            }}>Thời gian lưu trú:
                                                                            <div className='spot-time' style={{ paddingLeft: 'unset', width: 90 }}>{hoursStay} giờ {minutesStay} phút</div>
                                                                            </div>
                                                                        </span>
                                                                    </Card>
                                                                    <div className='to-next-item'>
                                                                        <div className='travel-info'>
                                                                            <img src={"../../images/car.svg"} />
                                                                            <div>{length} km | {hoursSpot != 0 && (hoursSpot + ' giờ ')}{minutesSpot + " phút"}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else {
                                                            return <div className='card-swap'>
                                                                <Card
                                                                    style={{ height: 105, borderRadius: '5px', boxShadow: '0 3px 6px 0 rgba(0,0,0,0.16)' }}>
                                                                    <span>
                                                                        <img alt="picture"
                                                                            style={{ width: 100, height: 105 }} src={place.image ? ("http://localhost:3000/" + place.image) : ''} />
                                                                    </span>

                                                                    <span >
                                                                        <Tooltip placement="top" title={place.name}>
                                                                            <div style={{ marginTop: -10, fontSize: 19, fontWeight: 'bold', paddingBottom: 5, position: 'absolute', top: 30, left: 115, }}>
                                                                                {_.truncate(place.name, {
                                                                                    'length': 20,
                                                                                    'separator': " "
                                                                                })}
                                                                            </div>
                                                                        </Tooltip>
                                                                        {/* <span className='spot-time' style={{ color: 'red', paddingLeft: 'unset', position: 'absolute', top: 0, right: 5, fontSize: 14 }}>{x.listSpot[index] && x.listSpot[index].startTime}</span> */}
                                                                    </span>
                                                                </Card>
                                                            </div>
                                                        }
                                                    })}
                                                </Container>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formLayout: 'horizontal',
                data: this.props.data
            };
        }

        render() {
            const { formLayout } = this.state;
            const formItemLayout =
                formLayout === 'horizontal'
                    ? {
                        labelCol: { span: 9 },
                        wrapperCol: { span: 4 },
                    }
                    : null;
            const { form } = this.props;

            const { getFieldDecorator } = form;
            return (
                <div>
                    <Form layout={formLayout} labelAlign="left" style={{ width: '100%' }}>
                        <div className='row' >

                            <div className='col-md-9' style={{ background: 'white', border: `1px solid lightgrey`, borderTopStyle: 'none', borderRightStyle: 'none' }}>
                                <div className='row'>
                                    {this.props.data.map((x, dragIndexParent) => {
                                        return <DroppableCard getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} id={dragIndexParent + ""} x={x} />
                                    })}
                                </div>
                            </div>
                            <div className='col-md-3' style={{ background: 'white', border: `1px solid lightgrey`, borderTopStyle: 'none', borderLeftStyle: 'none' }}>
                                <div className='row' style={{ width: '110%' }}>
                                    {this.props.dataRemain.map((x, dragIndexParent) => {
                                        return <DroppableCard dataRemain={true} id={dragIndexParent + "_remain"} x={x} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            );
        }
    },
);