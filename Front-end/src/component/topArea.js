import React, { Component } from 'react';
import background from '../images/bg_1.jpg';

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
                                <h1 className="mb-4">The Simplest <br />Way to Find Property</h1>
                                <p style={{ fontSize: '18px' }}>A small river named Duden flows by their place and supplies it with the
                                  necessary regelialia.
                       <br />It is a paradisematic country, in which roasted parts</p>
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
