import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ITimer from '../components/ITimer'

export default class RouterTest extends PureComponent {
    render() {
        return (
            <Router>
                <div>
                    <Link to='/gw'>购物车</Link>
                    <Route path='/gw' component={ITimer}></Route>
                </div>
            </Router>
        )
    }
}
