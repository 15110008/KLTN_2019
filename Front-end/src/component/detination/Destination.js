import React, { Component } from 'react'
import Axios from 'axios'

export default class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        Axios.get('http://localhost:3000/v1/place')
            .then((response) => {
                if (response.data.success) {
                    this.setState({ data: response.data.data })
                } else {
                }
            }).catch(error => {
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 heading-section text-center  mb-5">
                        <span className="subheading">Đề xuất</span>
                        <h2 className="mb-2">Những địa điểm hot</h2>
                    </div>
                </div>
                <div className='row'>
                    {this.state.data && this.state.data.map((x, index) => {
                        const price = parseInt(x.price)
                        const _price = price ? price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : null
                        if (index < 12) {
                            return (
                                // <div className="col-md-4">
                                //     <div className="property-wrap ">
                                //         <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-1.jpg)` }}></button>
                                //         <div className="text">
                                //             <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                //             <ul className="property_list">
                                //                 <li><span className="flaticon-bed"></span>3</li>
                                //                 <li><span className="flaticon-bathtub"></span>2</li>
                                //                 <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                //             </ul>
                                //             <h3><a href="properties-single.html">The Blue Sky Home </a></h3>
                                //             <span className="location">Oakland</span>
                                //             <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                //                 <span className="ion-ios-link"></span>
                                //             </a>
                                //         </div>
                                //     </div>
                                // </div>
                                <div className='col-md-3' style={{
                                    height: '330px',
                                    paddingRight: (index + 1) % 4 == 0 ? '15px' : '0px',
                                    marginBottom: '15px'

                                }}>
                                    <div className='property-wrap' style={{ backgroundImage: 'no-repeat' }} >
                                        <img className="img" src={"../../images/image_2.jpg"} style={{
                                            borderRadius: '5px 5px 0px 0px', height: 200
                                        }} />
                                        <div style={{
                                            height: '100px',
                                            borderRadius: '0px 0px 5px 5px',
                                            border: `solid 1px #d9d9d9 `
                                        }}>
                                            <div className='content destination-card-name'>
                                                {x.name}
                                            </div>
                                            <div className='extra-content destination-card-price'>
                                                <div></div>
                                                <div>{_price ? _price + '  Đ' : ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="row ">
                    <div className="col text-center">
                        <div className="block-27">
                            <ul>
                                <li><a href="#/home">&lt;</a></li>
                                <li className="active"><span>1</span></li>
                                <li><a href="#/home">2</a></li>
                                <li><a href="#/home">3</a></li>
                                <li><a href="#/home">4</a></li>
                                <li><a href="#/home">5</a></li>
                                <li><a href="#/home">&gt;</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
