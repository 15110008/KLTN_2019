import React, { Component } from 'react'
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 55 }} spin />;

export default class Loading extends Component {
    render() {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                position: 'relative',
                marginLeft: '-50vw',
                background: 'transparent',
                left: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Spin indicator={antIcon} />

            </div>
        )
    }
}
