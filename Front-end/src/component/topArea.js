import React, { Component } from 'react';
import background from '../images/background.jpg';

export default class Index extends Component {
    render() {
        return (
            <div className="hero-wrap ftco-degree-bg" style={{ backgroundImage: `url(${background})` }}
                data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="col-lg-8 col-md-6 d-flex align-items-end">
                            <div className="text text-center">
                                <h1 className="mb-4" style={{ color: 'white' }}>Lên lịch trình cho chuyến đi tiếp theo của bạn</h1>
                                <p style={{ fontSize: '18px', color: 'white' }}>Tạo lịch trình từng ngày hoàn toàn miễn phí ngay hôm nay. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mouse">
                    <a href="#/home" className="mouse-icon">
                        <div className="mouse-wheel"><span className="ion-ios-arrow-round-down"></span></div>
                    </a>
                </div>
            </div>
        )
    }
}
