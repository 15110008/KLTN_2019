import React, { Component } from 'react'
import Modal from './base/Modal'
import { ButtonToolbar } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import LoginForm from './base/formLogin'

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

    responseFacebook(response) {
        console.log("TCL: Header -> responseFacebook -> response", response)
    }

    componentClicked() {
        console.log('clicked')
    }

    contentLogin() {
        return (
            <LoginForm />
        )
    }

    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = null
        } else {
            fbContent = (<FacebookLogin
                appId="430163910969334"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />)
        }
        let addModalClose = () => this.setState({ addModalShow: false })
        return (
            <div>
                {fbContent}
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
                                    <div className='login-button' data-title="Đăng nhập"
                                        onClick={() => this.setState({
                                            addModalShow: true
                                        })}
                                    ></div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Modal
                    title={'Đăng nhập'}
                    content={this.contentLogin()}
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
            </div >
        )
    }
}
