import React, { PureComponent } from 'react'

export default class ITimer extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
             content: '开始计时',
             second: 60,
             disabled: false
        }
        this.handleTimer = this.handleTimer.bind(this)
        // this.countDown = this.countDown.bind(this)
        // this.toggleButtonState = this.toggleButtonState.bind(this)
    }
    handleTimer(e){
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
            second: 60
        })
    }

    setContent(str){
        this.setState({
            content: str
        })
    }

    componentDidUpdate() {
        if(this.state.second===50){
            clearInterval(this.timer)
            this.toggleButtonState()
            this.initSecond()
            this.setContent('重新计时')
        }
        if(this.state.disabled && this.state.second===60){                   
            this.timer = setInterval(() => {            
                this.countDown()
            }, 1000);
        }
    }
    
    
    render() {
        return (
            <div>
                <button onClick={this.handleTimer} disabled={this.state.disabled}>{this.state.content}</button>  <br />
                <button onClick={()=>{this.props.history.go(-1)}}>返回上一页</button>
                <p>{this.state.second}</p>
                <p>{this.state.content}</p>
            </div>
        )
    }
}
