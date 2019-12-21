import { Tabs, notification } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './style.scss';
import _ from 'lodash'

const { TabPane } = Tabs;


export default class formLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            picture: '',
            password: '',
            phoneNumber: '',
            password2: '',
            login: 'Đăng nhập',
            error: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentClicked() {
        console.log('clicked')
    }

    responseFacebook(response) {
        const me = this
        console.log("TCL: formLogin -> responseFacebook -> me", me)
        console.log("TCL: Header -> responseFacebook -> response", response)
        const params = {
            facebook: {
                facebookId: response.id,
                facebookToken: response.accessToken,
                facebookName: response.name,
                facebookEmail: response.email
            }
        }
        axios.post('http://localhost:3000/v1/account/login/facebook', params).then(res => {
            if (res.data.success) {
                this.onClose()
                localStorage.setItem('jwt', res.data.result);
                localStorage.setItem('name', response.name ? response.name : null);
                localStorage.setItem('email', response.email ? response.email : null);
                localStorage.setItem('avatar', response.picture.data.url ? response.picture.data.url : null);
                localStorage.setItem('facebookLogin', true);
                this.userVisible && this.userVisible()
                this.getName && this.getName(response.name)
                this.getEmail && this.getEmail(response.email)
                this.getAvatar && this.getAvatar(response.picture.data.url)
                console.log("TCL: formLogin -> responseFacebook -> response.picture.data.url", response.picture.data.url)
            } else {
                notification['error']({
                    message: res.data.message,
                });
            }
        }).catch(error => {
            console.log("TCL: formLogin -> onSubmit -> error", error)
        });
    }

    responseGoogle(response) {
        console.log(response);
        const me = this
        const params = {
            google: {
                googleId: response.googleId,
                googleToken: response.accessToken,
                googleName: response.profileObj.name,
                googleEmail: response.profileObj.email
            }
        }

        axios.post('http://localhost:3000/v1/account/login/google', params).then(res => {
            if (res.data.success) {
                this.onClose()
                localStorage.setItem('jwt', res.data.result);
                localStorage.setItem('name', response.profileObj.name ? response.profileObj.name : null);
                localStorage.setItem('email', response.profileObj.email ? response.profileObj.email : null);
                localStorage.setItem('avatar', response.profileObj.imageUrl ? response.profileObj.imageUrl : null);
                localStorage.setItem('googleLogin', true);
                this.userVisible && this.userVisible()
                this.getName && this.getName(response.profileObj.name)
                this.getEmail && this.getEmail(response.profileObj.email)
                this.getAvatar && this.getAvatar(response.profileObj.imageUrl)
            } else {
                notification['error']({
                    message: res.data.message,
                });
            }
        }).catch(error => {
            console.log("TCL: formLogin -> onSubmit -> error", error)
        });
    }

    onSubmit(e) {
        axios.post('http://localhost:3000/v1/account/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log("TCL: formLogin -> onSubmit -> response", response)
            if (response.data.success) {
                this.onClose()
                localStorage.setItem('jwt', response.data.result.jwt);
                localStorage.setItem('name', response.data.meta ? response.data.meta.name : null);
                localStorage.setItem('email', this.state.email);
                this.props.userVisible && this.props.userVisible()
                this.props.getName && this.props.getName(!_.isEmpty(response.data.meta) ? response.data.meta.name : '')
                this.props.getEmail && this.props.getEmail(this.state.email)
            } else {
                notification['error']({
                    message: response.data.message,
                });
            }
        }).catch(error => {
            console.log("TCL: formLogin -> onSubmit -> error", error)
        });
    }

    createAccount() {
        if (this.state.name && this.state.name && this.state.email && this.state.password) {
            if (this.state.password !== this.state.password2) {
                notification['error']({
                    message: 'Mật khẩu 2 không khớp!'
                });
            } else {
                axios.post('http://localhost:3000/v1/account', {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                }).then(response => {
                    if (response.data.success) {
                        const data = response.data.result
                        this.onClose()
                        this.props.userVisible && this.props.userVisible()
                        this.props.getName && this.props.getName(!_.isEmpty(data.name) ? data.name : '')
                        this.props.getEmail && this.props.getEmail(data.email)
                    } else {
                        notification['error']({
                            message: response.data.message,
                        });
                    }
                }).catch(error => {
                });
            }
        } else {
            this.setState({
                error: true
            })
        }
    }

    onChange(val, field) {
        if (field === 'name') {
            this.setState({ name: val.target.value })
        } else if (field === 'email') {
            this.setState({ email: val.target.value })

        } else if (field === 'phoneNumber') {
            this.setState({ phoneNumber: val.target.value })

        } else if (field === 'password') {
            this.setState({ password: val.target.value })

        } else if (field === 'password2') {
            this.setState({ password2: val.target.value })

        }

    }

    onClose() {
        this.props.onCloseModal && this.props.onCloseModal()
    }

    callback(key) {
        console.log("TCL: formLogin -> callback -> key", key)
        if (key == 1) {
            this.setState({
                login: 'Đăng nhập'
            })
        } else {
            this.setState({
                login: 'Tạo tài khoản'
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        let fbContent;
        let googleContent;
        if (this.state.isLoggedIn) {
            fbContent = null
            googleContent = null
        } else {
            fbContent = (<FacebookLogin
                appId="430163910969334"
                fields="name,email,picture"
                onClick={this.componentClicked}
                onClose={() => this.onClose()}
                userVisible={this.props.userVisible}
                getName={this.props.getName}
                getEmail={this.props.getEmail}
                getAvatar={this.props.getAvatar}
                callback={this.responseFacebook}
            />)

            googleContent = (< GoogleLogin
                clientId="66330207844-23svcr4j2tptb8nc2e0o1j2q7i5v7rde.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                onClose={() => this.onClose()}
                userVisible={this.props.userVisible}
                getName={this.props.getName}
                getEmail={this.props.getEmail}
                getAvatar={this.props.getAvatar}
                callback={this.responseFacebook}
                cookiePolicy={'single_host_origin'}
            />)
        }
        return (
            <div>
                <div className='row  form-custom-input'>
                    <div className="col-md-6">
                        <h2> {this.state.login}</h2>
                        <img style={{ width: '100%', height: '87%' }} src={"../../images/graphic-map.png"} />
                        <div className='background-login-form'></div>
                    </div>
                    <div className="col-md-6">
                        <Tabs defaultActiveKey="1" onChange={(val) => this.callback(val)}>
                            <TabPane tab="Đăng nhập" key="1">
                                <input placeholder="Email đăng nhập" type="text" required="" value={this.state.email} onChange={(e) => this.onChange(e, 'email')} />
                                <input placeholder="Mật khẩu" type="password" required="" value={this.state.password} onChange={(e) => this.onChange(e, 'password')} />
                                <div style={{ display: 'flex' }}>
                                    {fbContent}
                                    <span className='google-login-btn'>{googleContent}</span>
                                </div>
                                <div style={{ display: 'flex', paddingLeft: '25px', paddingTop: '20px' }}>
                                    <div className='btn-group' >
                                        <button onClick={() => this.onSubmit()} className='btn btn-primary' > Đăng nhập </button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Tạo tài khoản" key="2" onChange={(val) => this.callback(val)}>
                                <input placeholder="Tên" type="text" required="" value={this.state.name} onChange={(e) => this.onChange(e, 'name')} />
                                <input placeholder="SĐT" type="text" required="" value={this.state.phoneNumber} onChange={(e) => this.onChange(e, 'phoneNumber')} />
                                <input placeholder="Email đăng nhập" type="text" required="" value={this.state.email} onChange={(e) => this.onChange(e, 'email')} />
                                <input placeholder="Mật khẩu" type="password" required="" value={this.state.password} onChange={(e) => this.onChange(e, 'password')} />
                                <input placeholder="Mật khẩu lần 2" type="password" required="" value={this.state.password2} onChange={(e) => this.onChange(e, 'password2')} />
                                {this.state.error ? <div style={{ fontSize: 12, color: 'red', paddingLeft: '25px', paddingTop: '20px' }}>Bạn chưa nhập đầy đủ thông tin</div> : ''}
                                <div style={{
                                    display: 'flex', paddingLeft: '25px', paddingTop: '10px'
                                }}>
                                    <div className='btn-group' >

                                        <button onClick={() => this.createAccount()} className='btn btn-primary' > Tạo tài khoản </button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            </div >
        )
    }
}
