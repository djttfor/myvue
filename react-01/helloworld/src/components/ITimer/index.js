import React, { PureComponent } from 'react'

export default class ITimer extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
             content: '发送验证码',
             second: this.props.second,
             disabled: false
        }
        this.handleTimer = this.handleTimer.bind(this)

    }
    handleTimer(){
        this.toggleButtonState()
    }

    countDown(){
        this.setState((state)=>({
            second: state.second-1,
            content: state.second-1
        }))
    }

    toggleButtonState(){
        this.setState((state)=>({
            disabled: !state.disabled
        }))
    }

    initSecond(){
        this.setState({
            second: this.props.second
        })
    }

    setContent(str){
        this.setState({
            content: str
        })
    }

    componentDidUpdate() {
        if(this.state.second===0){
            clearInterval(this.timer)
            this.toggleButtonState()
            this.initSecond()
            this.setContent('重新发送')
            //执行回调
            this.props.callback()
        }
        if(this.state.disabled && this.state.second===this.props.second){                   
            this.timer = setInterval(() => {            
                this.countDown()
            }, 1000);
        }
    }
    
    
    render() {
        return (
            <div style={{display: 'inline'}}>
                <button onClick={this.handleTimer} disabled={this.state.disabled}>{this.state.content}</button>  <br />
                <p>{this.state.second}</p>
                <p>{this.state.content}</p>
            </div>
        )
    }
}
