import React, { Component } from 'react'
import { createBrowserHistory } from "history";
import axios from 'axios'
import { Carousel, Icon, Rate, Modal, Progress, notification, Avatar, Input, Form, Button } from 'antd'
import './style.scss'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import _ from 'lodash'

const { TextArea } = Input

const history = createBrowserHistory()

const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
const insc = ['Tuyệt vời', 'Tốt', 'Bình thường', 'Tệ', 'Rất tệ',];

const mapStyles = {
    width: '380px',
    height: '340px',
};
class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            meta: [],
            value: 0,
            previewVisible: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }
    next() {
        this.carousel.next();
    }
    previous() {
        this.carousel.prev();
    }

    componentDidMount() {
        const path = history.location.pathname
        const desId = path.split('/')[2]
        this.loadData(desId)
    }

    async loadData(id) {
        await axios({
            url: 'http://localhost:3000/v1/place/' + id,
            method: 'get'
        })
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    const meta = res.data.meta
                    this.setState({
                        data: data,
                        value: data.rate,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        meta: meta
                    })
                }
            }).catch((err) => {
            })
        axios.get('http://localhost:3000/v1//place/comment/' + id)
            .then((res) => {
                if (res.data.success) {

                }
            }).catch((error) => {
                console.log("TCL: Destination -> error", error)
            })
    }

    handleChange = value => {
        const path = history.location.pathname
        const desId = path.split('/')[2]
        const token = localStorage.getItem('jwt')
        this.setState({ value });
        const params = {
            placeId: desId,
            rating: value
        }
        const header = {
            headers: { jwt: token },
        }
        axios.post('http://localhost:3000/v1/place/rating', params, header)
            .then((res) => {
                if (res.data.success) {
                    notification['success']({
                        message: 'Cảm ơn bạn đã đánh giá !!!',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            }).catch((error) => {
                console.log("TCL: Destination -> error", error)
            })
    };

    onCreateComment() {
        const data = this.formRef.getFieldsValue()
        if (data.content) {
            const path = history.location.pathname
            const desId = path.split('/')[2]
            const token = localStorage.getItem('jwt')
            const params = {
                placeId: desId,
                comment: data.content
            }
            const header = {
                headers: { jwt: token },
            }
            axios.post('http://localhost:3000/v1/place/comment', params, header)
                .then((res) => {
                    if (res.data.success) {
                        notification['success']({
                            message: 'Đăng tải bình luận thành công !!!',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.formRef.setFields({
                            content: null
                        })
                        this.loadData(desId)
                    }
                }).catch((error) => {
                    console.log("TCL: Destination -> error", error)
                })
        }
    }

    onViewImage(idx) {
        this.setState({
            previewVisible: true
        })
    }

    handleCancel = () => this.setState({ previewVisible: false });

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });


    render() {
        const arr = [0, 1, 2, 3, 4, 5]
        const { data, value, meta } = this.state
        return (data ?
            <div style={{ marginTop: 100, backgroundColor: '#f5f5f5' }}>
                <div className='container destination'>
                    <br />
                    <div style={{
                        border: '1px solid rgb(235, 237, 240)',
                        background: '#ffff'
                    }}>
                        <span style={{ padding: 15, fontSize: 35, fontWeight: 'bold' }}>{data.name}</span>
                        <span className='rate'>
                            <Rate allowHalf disabled tooltips={desc} onChange={this.handleChange} value={value} />
                        </span>
                        <div><Icon type="environment" className="location-svg" /> {data.location}</div>
                    </div>
                    <div className='row' style={{ marginRight: 'unset', marginLeft: 'unset' }}>
                        <div className='col-md-8' style={{ padding: 'unset', paddingRight: '15px' }}>
                            <div style={{
                                border: '1px solid rgb(235, 237, 240)',
                                background: '#ffff',
                                marginTop: 30
                            }}>
                                <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
                                    {data.images && arr.map((x, index) => {
                                        if (x < 5) {
                                            return <div className='col-md-4' style={{ paddingTop: x > 2 ? 7.5 : 0, paddingLeft: (x % 3 != 0 || x == 0) ? 0 : 7.5, paddingRight: x % 3 == 2 ? 0 : 7.5 }}>
                                                <img className='img-destination' onClick={(index) => this.onViewImage(index)} style={{ border: '2px solid rgb(235, 237, 240)' }} src={data.images[x] ? ("http://localhost:3000/" + data.images[x]) : ''} />
                                            </div>
                                        }
                                        else if (_.size(data.images) > 5) {
                                            return <div className='col-md-4' style={{ paddingTop: x > 2 ? 7.5 : 0, paddingLeft: (x % 3 != 0 || x == 0) ? 0 : 7.5, paddingRight: x % 3 == 2 ? 0 : 7.5 }}>
                                                <img className='img-destination' style={{ border: '2px solid rgb(235, 237, 240)' }} src={data.images[x] ? ("http://localhost:3000/" + data.images[x]) : ''} />
                                                <div className='overlay2' onClick={(index) => this.onViewImage(index)}>
                                                    <div className='img-destination-content'>
                                                        <span><Icon type="plus" style={{ color: '#fff' }} /></span><span>{_.size(data.images) - 6}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        } else {
                                            // return <div className='col-md-4' style={{ paddingTop: x > 2 ? 7.5 : 0, paddingLeft: (x % 3 != 0 || x == 0) ? 0 : 7.5, paddingRight: x % 3 == 2 ? 0 : 7.5 }}>
                                            //     <img className='img-destination' style={{ border: '2px solid rgb(235, 237, 240)' }} src={data.images[x] ? ("http://localhost:3000/" + data.images[x]) : ''} />
                                            // </div>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div style={{
                            border: '1px solid rgb(235, 237, 240)',
                            background: '#ffff',
                            marginTop: 30,
                        }} className='col-md-4'>
                            {data && <Map
                                google={this.props.google}
                                zoom={10}
                                style={mapStyles}
                                initialCenter={{ lat: 11.939845, lng: 108.457586 }}
                            >
                                <Marker
                                    title={data.name}
                                    onClick={this.onMarkerClick}
                                    name={data.name}
                                    position={{ lng: this.state.latitude, lat: this.state.longitude }} />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}>
                                    <div>
                                        <div>{data.name}</div>
                                    </div>
                                </InfoWindow>
                            </Map>}
                        </div>
                    </div>
                    <div style={{
                        border: '1px solid rgb(235, 237, 240)',
                        background: '#ffff',
                        marginTop: 30,
                    }}>
                        <div className='container' style={{ paddingTop: 15 }}>
                            <h3>Giới thiệu về {data.name}</h3>
                            <p style={{ textAlign: "justify" }}>{data.description}</p>
                        </div>
                    </div>

                    <div style={{
                        border: '1px solid rgb(235, 237, 240)',
                        background: '#ffff',
                        marginTop: 30,
                    }} className='col-md-8'>
                        <div className='container' style={{ paddingTop: 15 }}>
                            <h3>Bình luận và đánh giá</h3>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='rate-container'>
                                        {data.rate ? data.rate : 0} <Icon type="star" />
                                    </div>
                                    <div className='user-rating'>{meta.count}<Icon type="user" /></div>
                                </div>
                                <div className='col-md-2' style={{
                                    fontSize: '15px',
                                    marginTop: '26px'
                                }}>
                                    {insc.map((x) => {
                                        return <div>{x}</div>
                                    })}
                                </div>
                                <div className='col-md-6' style={{ marginTop: 20 }}>
                                    <div>
                                        <Progress percent={Math.floor((meta.count5 * 100) / meta.count)} status="normal" />
                                        <Progress percent={Math.floor((meta.count4 * 100) / meta.count)} status="normal" />
                                        <Progress percent={Math.floor((meta.count3 * 100) / meta.count)} status="normal" />
                                        <Progress percent={Math.floor((meta.count2 * 100) / meta.count)} status="normal" />
                                        <Progress percent={Math.floor((meta.count1 * 100) / meta.count)} status="normal" />
                                    </div>,
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', paddingTop: 20 }}>
                                <div>Bạn nghĩ sao về {data.name} ?</div>
                                <div >
                                    <Rate allowHalf tooltips={desc} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='container comment-container' style={{ paddingTop: 15 }}>
                            <div className='row'>
                                <div style={{ width: 85 }}>
                                    <Avatar size={64} icon="user" />
                                </div>
                                <div className='col-md-10'>
                                    <CollectionCreateForm
                                        ref={c => this.formRef = c}
                                        wrappedComponentRef={this.saveFormRef}
                                    />
                                </div>
                                <div style={{ width: 85 }}></div>
                                <div className='col-md-10'>
                                    <Button type="primary" shape="round" onClick={() => this.onCreateComment()}> Đăng tải bình luận
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Modal width={"70%"} className='modal-image' centered visible={this.state.previewVisible} closable={null} footer={null} onCancel={this.handleCancel}>
                        <div className='icon-arrow-left' >
                            <Icon className='left-circle' type="left-circle" onClick={this.previous} />
                        </div>
                        <Carousel ref={node => (this.carousel = node)} >
                            {data.images && data.images.map((x, index) => {
                                return <div key={index}>
                                    <img style={{ width: '100%', height: '600px' }} src={x ? ("http://localhost:3000/" + x) : ''} />
                                </div>
                            })}
                        </Carousel>
                        <div className='icon-arrow-right'>
                            <Icon className='right-circle' type="right-circle" onClick={this.next} />
                        </div>
                    </Modal>
                </div>
            </div >
            : '')
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBq3nESVwkdiU7tEWFoiUAP_puTmKsndwo'
})(Destination);

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
                        <Form.Item {...formItemLayout} label="">
                            {getFieldDecorator('content')(<TextArea rows={5} autoSize={true} />)}
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    },
);