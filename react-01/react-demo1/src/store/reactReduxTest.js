import React, { Component } from 'react'

export default class ReactReduxTest extends Component {
    constructor(props) {
        super(props)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
        this.incrementIfAsync = this.incrementIfAsync.bind(this)
    
    }

    increment(){
        const {value} = this.addNum
        this.props.increment(value)
    }
    decrement(){
        const {value} = this.addNum
        this.props.decrement(value)
    }
    incrementIfOdd(){
        if(this.props.sum % 2 !== 0){
            const {value} = this.addNum
            this.props.increment(value)
        }
    }
    incrementIfAsync(){
        const {value} = this.addNum
        this.props.incrementAsync(value,500)
    }

    render() {
        return (
            <div>
                <p>{this.props.sum }</p>
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
