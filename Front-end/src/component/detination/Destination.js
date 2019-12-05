import React, { Component } from 'react'
import { createBrowserHistory } from "history";
import axios from 'axios'
import { PageHeader, Descriptions } from 'antd'

const history = createBrowserHistory()

export default class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const path = history.location.pathname
        const desId = path.split('/')[2]
        this.loadData(desId)
    }

    async loadData(id) {
        await axios({
            url: 'http://localhost:3000/v1/place/' + id,
            method: 'get'
        })
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    this.setState({
                        data: data
                    })
                }
            }).catch((err) => {
            })
    }

    render() {
        const { data } = this.state
        return (
            <div style={{ marginTop: 100, backgroundColor: '#f5f5f5' }}>
                <div className='container'>
                    <br />
                    <div style={{
                        border: '1px solid rgb(235, 237, 240)',
                        background: '#ffff'
                    }}>
                        <h2 style={{ padding: 15 }}>{data.name}</h2>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}
