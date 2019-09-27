import React, { Component } from 'react'
import TopArea from './topArea'

export default class Body extends Component {
    render() {
        return (
            <div>
                <TopArea />
                {/*start Service */}
                <section className="ftco-section ftco-no-pb">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center  mb-5">
                                <span className="subheading">Our Services</span>
                                <h2 className="mb-2">The smartest way to buy a home</h2>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-3 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-piggy-bank"></span>
                                    </div>
                                    <div className="media-body py-md-4">
                                        <h3>No Downpayment</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-wallet"></span>
                                    </div>
                                    <div className="media-body py-md-4">
                                        <h3>All Cash Offer</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-file"></span></div>
                                    <div className="media-body py-md-4">
                                        <h3>Experts in Your Corner</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-locked"></span>
                                    </div>
                                    <div className="media-body py-md-4">
                                        <h3>Lokced in Pricing</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section goto-here">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center  mb-5">
                                <span className="subheading">What we offer</span>
                                <h2 className="mb-2">Exclusive Offer For You</h2>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-1.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home </a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-2.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-3.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-4.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-5.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-6.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-7.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-5.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="property-wrap ">
                                        <button href="properties-single.html" className="img" style={{ backgroundImage: `url(images/work-6.jpg)` }}></button>
                                        <div className="text">
                                            <p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
                                            <ul className="property_list">
                                                <li><span className="flaticon-bed"></span>3</li>
                                                <li><span className="flaticon-bathtub"></span>2</li>
                                                <li><span className="flaticon-floor-plan"></span>1,878 sqft</li>
                                            </ul>
                                            <h3><a href="properties-single.html">The Blue Sky Home</a></h3>
                                            <span className="location">Oakland</span>
                                            <a href="properties-single.html" className="d-flex align-items-center justify-content-center btn-custom">
                                                <span className="ion-ios-link"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
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
                        </div>
                    </div>
                </section>
                {/*end Service */}
                <section className="ftco-section ftco-degree-bg services-section img mx-md-5"
                    style={{ backgroundImage: `url(images/bg_2.jpg)` }}>
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row justify-content-start mb-5">
                            <div className="col-md-6 text-center heading-section heading-section-white ">
                                <span className="subheading">Work flow</span>
                                <h2 className="mb-3">How it works</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                        <div className="media block-6 services services-2">
                                            <div className="media-body py-md-4 text-center">
                                                <div className="icon mb-3 d-flex align-items-center justify-content-center"><span>01</span></div>
                                                <h3>Evaluate Property</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                        <div className="media block-6 services services-2">
                                            <div className="media-body py-md-4 text-center">
                                                <div className="icon mb-3 d-flex align-items-center justify-content-center"><span>02</span></div>
                                                <h3>Meet Your Agent</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                        <div className="media block-6 services services-2">
                                            <div className="media-body py-md-4 text-center">
                                                <div className="icon mb-3 d-flex align-items-center justify-content-center"><span>03</span></div>
                                                <h3>Close the Deal</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                        <div className="media block-6 services services-2">
                                            <div className="media-body py-md-4 text-center">
                                                <div className="icon mb-3 d-flex align-items-center justify-content-center"><span>04</span></div>
                                                <h3>Have Your Property</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-no-pb">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center"
                                style={{ backgroundImage: `url(images/about.jpg)` }}>
                            </div>
                            <div className="col-md-6 wrap-about py-md-5 ">
                                <div className="heading-section p-md-5">
                                    <h2 className="mb-4">We Put People First.</h2>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a
              paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                    <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have
                                      been rewritten a thousand times and everything that was left from its origin would be the word "and" and
                                      the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said
                                      could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her
              drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
