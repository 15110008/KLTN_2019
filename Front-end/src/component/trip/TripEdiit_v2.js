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

    onDragEnd = result => {
        const { destination, source, draggableId } = result
        console.log("TCL: Trip -> draggableId", draggableId)
        console.log("TCL: Trip -> source", source)
        console.log("TCL: Trip -> destination", destination)
        const { data, allTrip, dataRemain } = this.state
        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const indexParent = source.droppableId
        const indexHover = destination.droppableId
        const dragIndexChild = source.index
        const hoverIndexChild = destination.index
        let dragCard = null
        if (_.includes(indexParent, 'remain') && _.includes(indexHover, 'remain')) {
            return
        }
        if (_.includes(indexParent, 'remain')) {
            dragCard = {
                id: dataRemain[0].listPlaces[dragIndexChild]._id,
                name: dataRemain[0].listPlaces[dragIndexChild].name,
                image: dataRemain[0].listPlaces[dragIndexChild].images && dataRemain[0].listPlaces[dragIndexChild].images[0],
            }
            dataRemain[0].listPlaces.splice(dragIndexChild, 1)
            data[indexHover].listPlaces.splice(hoverIndexChild, 0, dragCard)
        } else if (_.includes(indexHover, 'remain')) {
            dragCard = {
                name: data[indexParent].listPlaces[dragIndexChild].name,
                _id: data[indexParent].listPlaces[dragIndexChild].id,
                images: [data[indexParent].listPlaces[dragIndexChild].image]
            }
            data[indexParent].listPlaces.splice(dragIndexChild, 1)
            dataRemain[0].listPlaces.splice(hoverIndexChild, 0, dragCard)
        } else {
            dragCard = data[indexParent].listPlaces[dragIndexChild]
            if (indexParent != indexHover) {
                if (dragIndexChild == data[indexParent].listPlaces.length - 1) {
                    data[indexParent].listSpot.splice(dragIndexChild - 1, 1)
                } else {
                    data[indexParent].listSpot.splice(dragIndexChild, 1)
                }
            }

            data[indexParent].listPlaces.splice(dragIndexChild, 1)
            data[indexHover].listPlaces.splice(hoverIndexChild, 0, dragCard)
        }
        if (_.includes(indexHover, 'remain')) {
            axios.post('http://localhost:3000/v1/trip/Detail', { listPlaces: data[indexParent].listPlaces })
                .then((res) => {
                    if (res.data.success) {
                        const dataListSpot = res.data.result
                        dataListSpot.map((x, index) => {
                            if (data[indexHover].listSpot[index]) {
                                data[indexHover].listSpot[index].length = x.length
                                data[indexHover].listSpot[index].spotTime = x.spotTime
                            } else {
                                data[indexHover].listSpot.push({
                                    display: index,
                                    length: x.length,
                                    spotTime: x.spotTime,
                                    startTime: null
                                })
                            }
                        })
                    }
                }).catch((err) => {
                }).finally(() => {
                    this.setState({
                        data: data
                    })
                })
        } else if (_.includes(indexParent, 'remain')) {
            axios.post('http://localhost:3000/v1/trip/Detail', { listPlaces: data[indexHover].listPlaces })
                .then((res) => {
                    if (res.data.success) {
                        const dataListSpot = res.data.result
                        dataListSpot.map((x, index) => {
                            if (data[indexHover].listSpot[index]) {
                                data[indexHover].listSpot[index].length = x.length
                                data[indexHover].listSpot[index].spotTime = x.spotTime
                            } else {
                                data[indexHover].listSpot.push({
                                    display: index,
                                    length: x.length,
                                    spotTime: x.spotTime,
                                    startTime: null
                                })
                            }
                        })
                    }
                }).catch((err) => {
                }).finally(() => {
                    this.setState({
                        data: data
                    })
                })
        } else {
            if (indexParent != indexHover) {
                axios.post('http://localhost:3000/v1/trip/Detail', { listPlaces: data[indexParent].listPlaces })
                    .then((res) => {
                        if (res.data.success) {
                            const dataListSpot = res.data.result
                            dataListSpot.map((x, index) => {
                                data[indexParent].listSpot[index].length = x.length
                                data[indexParent].listSpot[index].spotTime = x.spotTime
                            })
                        }
                    }).catch((err) => {
                    })
                axios.post('http://localhost:3000/v1/trip/Detail', { listPlaces: data[indexHover].listPlaces })
                    .then((res) => {
                        if (res.data.success) {
                            const dataListSpot = res.data.result
                            dataListSpot.map((x, index) => {
                                if (data[indexHover].listSpot[index]) {
                                    data[indexHover].listSpot[index].length = x.length
                                    data[indexHover].listSpot[index].spotTime = x.spotTime
                                } else {
                                    data[indexHover].listSpot.push({
                                        display: index,
                                        length: x.length,
                                        spotTime: x.spotTime,
                                        startTime: null
                                    })
                                }
                            })
                        }
                    }).catch((err) => {
                    }).finally(() => {
                        this.setState({
                            data: data
                        })
                    })
            } else {
                axios.post('http://localhost:3000/v1/trip/Detail', { listPlaces: data[indexParent].listPlaces })
                    .then((res) => {
                        if (res.data.success) {
                            const dataListSpot = res.data.result
                            dataListSpot.map((x, index) => {
                                data[indexParent].listSpot[index].length = x.length
                                data[indexParent].listSpot[index].spotTime = x.spotTime
                            })
                        }
                    }).catch((err) => {
                    }).finally(() => {
                        this.setState({
                            data: data
                        })
                    })
            }
        }
        console.log('this.state.data ->', data)
        console.log("TCL: Trip -> dataRemain", dataRemain)
    }

    async onSave() {
        const dataListSpot = this.formRef.getFieldsValue()
        await _.keys(dataListSpot).map((x, index) => {
            const indexParent = x.split('_')[0]
            const indexChild = x.split('_')[1]
            if (dataListSpot[x]) {
                this.state.data[indexParent].listSpot[indexChild].stayTime = parseInt(dataListSpot[x])
            }
        })
        await axios.put('http://localhost:3000/v1/trip/DetailSpot/' + this.id, { meta: this.state.data })
            .then((res) => {
                if (res.data.success) {
                    window.location.replace("http://localhost:3006/trip-detail-self/" + this.id)
                }
            })
    }

    renderData() {
        this.setState({
            data: this.state.data
        })
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
                    let data = res.data.meta
                    const allTrip = []
                    data = _.sortBy(data, x => {
                        return x.day
                    });
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
                    await axios.get('http://localhost:3000/v1/place/destination/' + res.data.result.destinationId)
                        .then((respone) => {
                            if (respone.data.success) {
                                const dataAllPlace = respone.data.result
                                let _dataAllPlace = []
                                let _allTrip = []
                                let dataRemain = []
                                dataAllPlace.map(x => {
                                    _dataAllPlace.push(x._id)
                                })
                                allTrip.map(x => {
                                    _allTrip.push(x.id)
                                })
                                const diff = _.difference(_dataAllPlace, _allTrip)
                                dataAllPlace.map(x => {
                                    diff.map(y => {
                                        if (x._id == y) {
                                            dataRemain.push(x)
                                        }
                                    })
                                })

                                dataRemain = [
                                    { listPlaces: dataRemain }
                                ]

                                this.setState({
                                    dataRemain: dataRemain
                                })
                            }
                        }).catch((err) => {
                            console.log("TCL: Trip -> loadData -> err", err)
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
            }} className='trip'>
                <div style={{ paddingTop: 100 }}>
                    <div style={{ padding: `0px 50px` }}>
                        <div className='row' style={{ marginBottom: '-35px' }}>
                            <div className='col-md-9' style={{ padding: 'unset' }}>
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
                            <div className='col-md-3' style={{ padding: 'unset' }}>
                                <PageHeader
                                    style={{
                                        border: '1px solid rgb(235, 237, 240)',
                                        borderLeftStyle: 'none',
                                        background: 'white',
                                    }}
                                    title="Những địa điểm khác"
                                />,
                            </div>
                        </div>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <CollectionCreateForm
                                ref={c => this.formRef = c}
                                wrappedComponentRef={this.saveFormRef}
                                data={data}
                                dataRemain={dataRemain}
                                renderData={() => this.renderData()}
                            />

                        </DragDropContext>
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
                                        return <DroppableCard renderData={() => this.props.renderData()} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} id={dragIndexParent + ""} x={x} />
                                    })}
                                </div>
                            </div>
                            <div className='col-md-3' style={{ background: 'white', border: `1px solid lightgrey`, borderTopStyle: 'none', borderLeftStyle: 'none' }}>
                                <div className='row' style={{ width: '110%' }}>
                                    {this.props.dataRemain.map((x, dragIndexParent) => {
                                        return <DroppableCard renderData={() => this.props.renderData()} dataRemain={true} id={dragIndexParent + "_remain"} x={x} />
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