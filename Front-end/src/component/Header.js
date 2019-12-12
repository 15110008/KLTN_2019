import React, { Component } from 'react'
import LoginForm from './base/formLogin'
import Modal from './base/Modal'
import { Menu, Dropdown, Icon } from 'antd'
import Loading from './base/Loading'


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            picture: '',
            userVisible: false,
        }
        this.menu = (
            <Menu>
                <Menu.Item>
                    <div onClick={() => this.signOut()}>
                        Đăng xuất
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={() => window.location.replace('http://localhost:3006/user')}>
                        Trang cá nhân
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    addModalClose = () => this.setState({ addModalShow: false })
    setUser = () => this.setState({ userVisible: true })
    getName = (name) => this.setState({ name: name })
    getEmail = (email) => this.setState({ email: email })

    contentLogin() {
        return (
            <LoginForm
                ref={c => this.loginFormRef = c}
                onCloseModal={this.addModalClose}
                userVisible={this.setUser}
                getName={this.getName}
                getEmail={this.getEmail}
            />
        )
    }

    componentDidMount() {
        this.checkJwt()
    }

    user() {
        return <div style={{ padding: '8px' }}>
            <Dropdown overlay={this.menu} >
                <div>
                    <i className="fa fa-user-circle-o" aria-hidden="true" style={{ padding: '8px' }}></i>
                    <span style={{ cursor: 'pointer' }}>{this.state.name === '' ? this.state.email : this.state.name}</span>
                    <Icon style={{
                        marginTop: '8px',
                        position: 'absolute',
                        paddingLeft: '5px'
                    }} type="down" />
                </div>
            </Dropdown>,
        </div>
    }

    signOut() {
        // this.props.onOpenLoading()
        // setTimeout(this.props.onCloseLoading(), 1000);
        localStorage.clear()
        this.setState({
            userVisible: false
        })
    }

    login() {
        return <div className='login-button' data-title="Đăng nhập"
            onClick={() => this.setState({
                addModalShow: true
            })}
        ></div>
    }

    checkJwt() {
        let hours = 1
        let jwt = localStorage.getItem('jwt')
        let email = localStorage.getItem('email')
        let name = localStorage.getItem('name')
        if (jwt && (new Date().getTime() - jwt > hours * 60 * 60 * 1000)) {
            localStorage.clear()
        }
        if (jwt) {
            this.setState({
                userVisible: true
            })
            this.getName(name)
            this.getEmail(email)
        } else {
            this.setState({
                userVisible: false
            })
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="#" style={{ marginBottom: 20 }} onClick={() => {
                            window.location.replace("http://localhost:3006")
                        }}>MTrip</a>
                        {/* <img onClick={() => {
                            window.location.href = "http://localhost:3006"
                        }} src={"../images/logo-travel4.svg"} style={{ width: 200, height: 200 }} /> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
	                </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active" style={{ marginTop: 5 }}><a href="#" className="nav-link" onClick={() => {
                                    window.location.replace("http://localhost:3006")
                                }}>Home</a></li>
                                <li className="nav-item"><a href="#" className="nav-link" onClick={() => {
                                    window.location.replace("http://localhost:3006/trip")
                                }}>Tạo lịch trình</a></li>
                                <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
                                <li className="nav-item" style={{ paddingTop: '3px' }}>
                                    {this.state.userVisible ? this.user() :
                                        this.login()
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Modal
                    // title={'Đăng nhập'}
                    content={this.contentLogin()}
                    show={this.state.addModalShow}
                    onHide={this.addModalClose}
                />
            </div >
        )
    }
}
