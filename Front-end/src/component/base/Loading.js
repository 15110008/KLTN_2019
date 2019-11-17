import React, { Component } from 'react'
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 55 }} spin />;

export default class Loading extends Component {
    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Spin indicator={antIcon} />

            </div>
        )
    }
}
