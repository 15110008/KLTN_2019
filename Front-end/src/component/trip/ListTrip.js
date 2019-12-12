import React, { Component } from 'react'
import axios from 'axios'

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    componentDidMount() {
        axios.get('http://localhost:3000/v1//trip/Public')
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    this.setState({
                        data: data
                    })

                }
            }).catch((err) => {
                console.log("TCL: Trip -> componentDidMount -> err", err)
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 heading-section text-center  mb-5">
                            <span className="subheading">Đề xuất</span>
                            <h2 className="mb-2">Lịch trình tạo gần đây</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
