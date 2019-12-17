import React, { Component } from 'react'
import { Button, Icon, Modal, notification, Tooltip } from 'antd'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './style.scss'
import Avatar from 'react-avatar-edit'
import Axios from 'axios';
import MyTrip from './MyTrip';
import Info from './Info';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            preview: null,
            src: null,
            visible: false
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    componentDidMount() {
        this.loadData()

    }

    loadData() {
        const token = localStorage.getItem('jwt')
        const headers = {
            headers: { jwt: token },
        }
        Axios.get('http://localhost:3000/v1/trip/UnPublic', headers)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    this.setState({
                        data: data,
                    })
                }
            }).catch((err) => {
                console.log("TCL: User -> componentDidMount -> err", err)
            })
        Axios.get('http://localhost:3000/v1/account/me', headers)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result

                    this.setState({
                        name: data.name ? data.name : null,
                        avatar: data.avatar ? 'http://localhost:3000/' + data.avatar : null
                    })
                }
            }).catch((err) => {
                console.log("TCL: Info -> componentDidMount -> err", err)
            })
    }

    urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    async onSave(preview) {
        if (preview) {
            console.log("TCL: User -> onSave -> preview", preview)
            const token = localStorage.getItem('jwt')
            const email = localStorage.getItem('email')
            const paramFile = {
                headers: {
                    jwt: token,
                    'Content-Type': 'multipart/form-data'
                },
            }
            var formData = new FormData();
            let file = await this.dataURLtoFile(preview, 'avatar-' + email + '.png')
            console.log("TCL: User -> onSave -> file", file)
            formData.append('avatar', file, file.name)
            Axios.post('http://localhost:3000/v1/account/upload', formData, paramFile)
                .then((res) => {
                    if (res.data.success) {
                        notification['success']({
                            message: 'Đăng tải hình thành công',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.loadData()
                        this.handleCancel()
                    }

                }).catch((err) => {
                    console.log("TCL: User -> onSave -> err", err)
                })
        }
    }

    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        this.setState({ preview })
    }

    handleCancel() {
        this.setState({ visible: false });
    };

    render() {
        return (
            <Router >
                <div style={{ paddingTop: 100 }} className='user'>
                    <div className='user-area'>
                        <div className='user-coverImage'>
                            <div className='ui container user-info' style={{ display: 'flex' }}>
                                <div className='avatar'>
                                    <img src={this.state.avatar ? this.state.avatar : "../../images/user.png"} />
                                </div>

                                <div className='info' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <h3 className='user-name'>
                                        <div>{this.state.name}</div>
                                        <div>
                                            <Button type="primary" shape="round" icon="camera" onClick={() => this.setState({
                                                visible: true
                                            })}>
                                                <span style={{ marginTop: 3 }}>Đăng ảnh đại diện</span>
                                            </Button>
                                        </div>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className='user-action'>
                            <div className='second-button' onClick={() => window.location.href = 'http://localhost:3006/user/my-trip'}>
                                <Icon type="unordered-list" /> Lịch trình của tôi
                        </div>
                            <div className='primary-button' onClick={() => window.location.href = 'http://localhost:3006/user/info'}>
                                <Icon type="edit" /> Thông tin cá nhân
                        </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/user/my-trip">
                            <MyTrip data={this.state.data} />
                        </Route>
                        <Route path="/user/info">
                            <Info />
                        </Route>
                    </Switch>
                </div >
                <Modal
                    width={'50%'}
                    visible={this.state.visible}
                    title={null}
                    centered
                    footer={null}
                    onCancel={() => this.handleCancel()}

                >
                    <div className='row'>
                        <div className='col-md-8'>
                            <Avatar
                                width={390}
                                height={295}
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                src={this.state.src}
                            />
                        </div>
                        <div className='col-md-4'>
                            <div className='avatar' style={{ paddingTop: 50 }}>
                                <img src={this.state.preview} alt="Preview" />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
                        <Button onClick={() => this.onSave(this.state.preview)} type="primary">Lưu</Button>
                    </div>
                </Modal>
            </Router>
        )
    }
}
