import React, { Component } from 'react'
import CardSwap from './CardSwap_v2'
import axios from 'axios';
import { Tabs, Card, PageHeader, Form } from 'antd';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import DroppableCard from './DroppableCard';
import _ from 'lodash'

const { TabPane } = Tabs;

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
                        title: res.data.result.name
                    })
                }
            }).catch((err) => {
            })

    }


    render() {
        const { data, dataRemain } = this.state
        return (
            <div style={{
                background: 'rgba(0, 0, 0, 0.02)'
            }}>
                <div style={{ paddingTop: 100 }}>
                    <div style={{ padding: `0px 50px` }}>
                        <div className='row' style={{ marginBottom: '-35px' }}>
                            <div className='col-md-12' style={{ padding: 'unset' }}>
                                <PageHeader
                                    style={{
                                        border: '1px solid rgb(235, 237, 240)',
                                        borderRightStyle: 'none',
                                        background: 'white',
                                    }}
                                    onBack={() => window.history.back()}
                                    title={this.state.title}
                                />,
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    background: '#fff',
                    padding: 15, display: 'flex', justifyContent: 'center',
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    zIndex: 9999
                }}> <button
                    style={{ width: 150, height: 50, fontSize: 15, background: '#3897f1', color: '#fff' }}
                    type="button" className="btn btn-info" onClick={() => this.onSave()}>
                        Lưu</button></div>
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