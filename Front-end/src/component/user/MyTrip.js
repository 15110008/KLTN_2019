import React, { Component } from 'react'
import _ from 'lodash'
import { Rate } from 'antd'
import './style.scss'

export default class MyTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onClick(id) {
        window.location.href = "http://localhost:3006/trip-detail/" + id
    }

    render() {
        const { data } = this.props
        return (
            <div className='container user' style={{ paddingTop: 50 }}>
                <div className='row'>
                    {_.isEmpty(data) ? <h3>Bạn chưa có lịch trình nào</h3> :
                        data.map(x => {
                            const number = x.images && this.randomIntFromInterval(0, _.size(x.images) - 1)
                            return <div className='col-md-3'>
                                <div className='property-wrap' style={{ backgroundImage: 'no-repeat' }}>
                                    <img className="img" src={x.images ? "http://localhost:3000/" + x.images[number] : ''} style={{
                                        borderRadius: '5px 5px 0px 0px', height: 200, cursor: 'pointer'
                                    }}
                                        onClick={() => this.onClick(x['_id'])} />
                                    <div style={{
                                        height: '100px',
                                        borderRadius: '0px 0px 5px 5px',
                                        border: `solid 1px #d9d9d9 `
                                    }}>
                                        <div className='content destination-card-name' style={{ cursor: 'pointer', fontSize: '15px' }}
                                            onClick={() => this.onClick(x['_id'])} >
                                            {x.name.split('Lịch trình')[1]}
                                        </div>
                                        <span><Rate style={{
                                            fontSize: '15px',
                                            marginLeft: '10px'
                                        }} allowHalf disabled value={x.rate} />
                                        </span>
                                        <span className='rate-total'>
                                            {x.count ? x.count : 0} người đánh giá
                                            </span>
                                    </div>
                                </div>
                            </div>
                        })}
                </div>
            </div>
        )
    }
}
