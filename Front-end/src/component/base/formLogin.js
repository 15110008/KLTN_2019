import { Tabs, Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { toast, ToastContainer } from 'react-toastify';
import './style.scss';

const { TabPane } = Tabs;


export default class formLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            picture: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentClicked() {
        console.log('clicked')
    }

    responseFacebook(response) {
        console.log("TCL: Header -> responseFacebook -> response", response)
    }

    onSubmit(e) {
        axios.post('http://localhost:3000/v1/account/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log("TCL: formLogin -> onSubmit -> response", response)
            if (response.data.success) {
                this.onClose()
                this.props.userVisible && this.props.userVisible()
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
            toast.error('Lỗi server, vui lòng thử lại sau!')
        });
    }

    onChange(val, field) {
        if (field == 'email') {
            this.setState({
                email: val.target.value
            });
        } else {
            this.setState({
                password: val.target.value
            });
        }
    }

    onClose() {
        this.props.onCloseModal && this.props.onCloseModal()
    }

    callback(key) {
        console.log(key);
    }

    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = null
        } else {
            fbContent = (<FacebookLogin
                appId="430163910969334"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
            />)
        }
        return (
            <div>
                <div className='row'>
                    <div className="col-md-6">
                        <h2> Đăng nhập</h2>
                        <span>Đăng nhập để theo dõi đơn hàng, lưu
                            danh sách sản phẩm yêu thích, nhận
                            nhiều ưu đãi hấp dẫn.
                        </span>
                        <div className='background-login-form'></div>
                    </div>
                    <div className="col-md-6">
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="Đăng nhập" key="1">
                                <input placeholder="Nhập Email" type="text" required="" value={this.state.email} onChange={(e) => this.onChange(e, 'email')} />
                                <input placeholder="Nhập mật khẩu" type="password" required="" value={this.state.password} onChange={(e) => this.onChange(e, 'password')} />
                                {fbContent}
                                <div style={{ display: 'flex', paddingLeft: '25px', paddingTop: '20px' }}>
                                    <div className='btn-group' >

                                        <button onClick={this.onSubmit} className='btn btn-primary' > Đăng nhập </button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Tạo tài khoản" key="2">
                                <input placeholder="Nhập Email" type="text" required="" value={this.state.email} onChange={(e) => this.onChange(e, 'email')} />
                                <input placeholder="Nhập mật khẩu" type="password" required="" value={this.state.password} onChange={(e) => this.onChange(e, 'password')} />
                                <input placeholder="Nhập mật khẩu lần 2" type="password" required="" value={this.state.password} onChange={(e) => this.onChange(e, 'password')} />
                                <div style={{ display: 'flex', paddingLeft: '25px', paddingTop: '20px' }}>
                                    <div className='btn-group' >

                                        <button onClick={this.onSubmit} className='btn btn-primary' > Tạo tài khoản </button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
                <ToastContainer autoClose={3000} />
            </div >
        )
    }
}
