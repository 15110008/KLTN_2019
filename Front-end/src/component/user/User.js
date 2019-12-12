import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import './style.scss'

export default class User extends Component {
    render() {
        const name = localStorage.getItem('name')
        return (
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
                        <div className='primary-button'>
                            <Icon type="edit" /> Thông tin cá nhân
                        </div>
                        <div className='second-button'>
                            <Icon type="unordered-list" /> Lịch trình của tôi
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <div className='container'>

                </div>
            </div >
        )
    }
}
