import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Second from './second'
import First from './first'
import {Container} from './style'


export default class App extends PureComponent {
    render() {
        return (
            <Container>
                <div className='header'>Router Demo</div>
                <div className='sidebar'>
                    <div><Link to='/first'>页面一</Link></div>
                    <div><Link to='/second'>页面二</Link></div>
                </div>
                <div className='main'>
                    <Route path='/first' component={First}></Route>
                    <Route path='/second' component={Second}></Route>
                </div>
            </Container>
        )
    }
}
