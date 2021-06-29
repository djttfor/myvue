import React, { PureComponent } from 'react'


export default class Login extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin(){
        this.props.history.push('/first')
    }

    render() {
        return(
            <button onClick={this.handleLogin}>
                登录
            </button>
        )
    }
}
