import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch ,Redirect} from 'react-router-dom'
import Second from './second'
import First from './first'
import MyNavLink from './myNavLink'
import { Container } from './style'


export default class App extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedId: 'l1'
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        this.setState({
            selectedId: id
        })
    }

    render() {
        let selectedId = this.state.selectedId
        return (
            <Container>
                <div className='header'>Router Demo</div>
                <div className='sidebar'>
                    <div>
                        <MyNavLink
                            to='/first'
                            className={'clckho'}
                            activeClassName={'clicked'}                           
                        >页面一</MyNavLink></div>
                    <div>
                        <NavLink
                            to='/second'
                            className={'clckho'}
                            activeClassName={'clicked'}
                        >
                            页面二</NavLink>
                    </div>
                </div>
                <div className='main'>
                    <Switch>
                        <Route path='/first' component={First}></Route>
                        <Route path='/second' component={Second}></Route>
                        <Redirect to='/first'></Redirect>
                    </Switch>
                </div>
            </Container>
        )
    }
}
