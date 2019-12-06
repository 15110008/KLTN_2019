import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Loading from './base/Loading'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import CreateTrip from './trip/CreateTrip'
import TripDetail from './trip/TripDetail'
import Destination from './detination/Destination'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onCloseLoading() {
        this.setState({
            loading: false
        })
    }

    onOpenLoading() {
        this.setState({
            loading: true
        })
    }

    render() {
        if (this.state.loading) {
            return <div style={{ height: '100vh', width: '100vw' }}><Loading /></div>
        } else {
            return (
                <div>
                    <Header onCloseLoading={() => this.onCloseLoading()} onOpenLoading={() => this.onOpenLoading()} />
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/">
                                    <Body />
                                </Route>
                                <Route path="/trip">
                                    <CreateTrip />
                                </Route>
                                {/* <Route exact path="/trip-detail">
                                    <TripDetail />
                                </Route> */}
                                <Route path="/trip-detail/:id"><TripDetail /></Route>
                                <Route path="/destination/:id">< Destination /></Route>
                                {/* <Route path="/dashboard">
                                    <Dashboard />
                                </Route> */}
                            </Switch>
                        </div>
                    </Router >
                    <Footer />
                </div>
            )
        }
    }
}
