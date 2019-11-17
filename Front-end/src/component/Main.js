import React, { Component } from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Loading from './base/Loading'

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
                    <Body />
                    <Footer />
                </div>
            )
        }
    }
}
