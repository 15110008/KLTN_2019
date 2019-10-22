import React, { Component } from 'react'
import './style.scss'

export default class formLogin extends Component {

    
    render() {
        return (
            <div>
                <input placeholder="Username" type="text" required="" />
                <input placeholder="Password" type="password" required="" />
            </div>
        )
    }
}
