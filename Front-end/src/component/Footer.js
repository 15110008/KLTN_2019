import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            // <ul className="ftco-footer-social list-unstyled mt-5">
            //     <li><i className="fa fa-facebook-square" aria-hidden="true">asd</i></li>
            //     <li><a href='https://www.facebook.com/'><span className="icon-facebook">asd</span></a></li>
            //     <li><a href='https://www.instagram.com/'><span className="icon-instagram">asd</span></a></li>
            // </ul>
            <div className="ftco-footer ftco-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Uptown</h2>
                                <p>Far far away, behind the word mountains, far from the countries.</p>
                                <ul className="ftco-footer-social list-unstyled mt-5">
                                    <li><a href='https://twitter.com/'><span className="icon-twitter"></span></a></li>
                                    <li><a href='https://www.facebook.com/'><span className="icon-facebook"></span></a></li>
                                    <li><a href='https://www.instagram.com/'><span className="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-4">
                                <h2 className="ftco-heading-2">Community</h2>
                                <ul className="list-unstyled">
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Search Properties</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>For Agents</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Reviews</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>FAQs</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-4">
                                <h2 className="ftco-heading-2">About Us</h2>
                                <ul className="list-unstyled">
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Our Story</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Meet the team</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Company</h2>
                                <ul className="list-unstyled">
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>About Us</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Press</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Contact</a></li>
                                    <li><a href='#/home'><span className="icon-long-arrow-right mr-2"></span>Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Have a Questions?</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><span className="icon icon-map-marker"></span><span className="text">203 Fake St. Mountain View, San
                    Francisco, California, USA</span></li>
                                        <li><a href='#/home'><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
                                        <li><a href='#/home'><span className="icon icon-envelope pr-4"></span><span
                                            className="text">info@yourdomain.com</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">

                            <p>
                                Copyright &copy;
            <script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
