import React, { Component } from 'react'
import LoginForm from './base/formLogin'
import Modal from './base/Modal'



export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            picture: ''
        }
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



    user() {
        return <div style={{ padding: '8px' }}>
            <i className="fa fa-user-circle-o" aria-hidden="true" style={{ padding: '8px' }}></i>
            {this.state.name === '' ? this.state.email : this.state.name}
        </div>
    }

    login() {
        return <div className='login-button' data-title="Đăng nhập"
            onClick={() => this.setState({
                addModalShow: true
            })}
        ></div>
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">Uptown</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
	                </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"><a href="index.html" className="nav-link">Home</a></li>
                                <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
                                <li className="nav-item"><a href="agent.html" className="nav-link">Agent</a></li>
                                <li className="nav-item"><a href="services.html" className="nav-link">Services</a></li>
                                <li className="nav-item"><a href="properties.html" className="nav-link">Properties</a></li>
                                <li className="nav-item"><a href="blog.html" className="nav-link">Blog</a></li>
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
