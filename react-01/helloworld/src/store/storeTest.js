import React, { Component } from 'react'

export default class StoreTest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            sum: 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
        this.incrementIfAsync = this.incrementIfAsync.bind(this)
    }
    
    
    increment(){
        const {sum} = this.state
        const {value} = this.addNum
        this.setState({
            sum: sum + value*1
        })
    }
    decrement(){
        const {sum} = this.state
        const {value} = this.addNum
        this.setState({
            sum: sum - value*1
        })
    }
    incrementIfOdd(){
        if(this.state.sum % 2 !== 0){
            const {sum} = this.state
            const {value} = this.addNum
            this.setState({
                sum: sum + value*1
            })
        }
    }
    incrementIfAsync(){
        setTimeout(()=>{
            const {sum} = this.state
            const {value} = this.addNum
            this.setState({
                sum: sum + value*1
            })
        },500)
    }

    render() {
        return (
            <div>
                <p>{this.state.sum }</p>
                <select ref={c=> this.addNum = c }>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>奇数加</button>
                <button onClick={this.incrementIfAsync}>异步加</button>
            </div>
        )
    }
}
