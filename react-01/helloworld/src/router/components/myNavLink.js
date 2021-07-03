import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class MyNavLink extends Component {

    render() {
        const className = this.className
        return (
            <NavLink {...this.props}
                
            /> 
        )
    }
}
