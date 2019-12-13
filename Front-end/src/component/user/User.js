import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './style.scss'
import Axios from 'axios';
import MyTrip from './MyTrip';
import Info from './Info';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        const headers = {
            headers: { jwt: token },
        }
        Axios.get('http://localhost:3000/v1/trip/UnPublic', headers)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    this.setState({
                        data: data
                    })
                }
            }).catch((err) => {
                console.log("TCL: User -> componentDidMount -> err", err)
            })
    }

    render() {
        const name = localStorage.getItem('name')
        return (
            <Router >
                <div style={{ paddingTop: 100 }} className='user'>
                    <div className='user-area'>
                        <div className='user-coverImage'>
                            <div className='ui container user-info' style={{ display: 'flex' }}>
                                <div className='avatar'>
                                    <img src={"../../images/user.png"} />
                                </div>
                                <div className='info' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <h3 className='user-name'>
                                        <div>{name}</div>
                                        <div>
                                            <Button type="primary" shape="round" icon="camera" >
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
            </Router>
        )
    }
}
