import React, { Component } from 'react'
import store from '.'

export default class StoreDemo extends Component {
    constructor(props) {
        super(props)
    

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
        this.incrementIfAsync = this.incrementIfAsync.bind(this)
    
    }

    componentDidMount() {
        store.subscribe(()=>{
            this.setState({})
        })
    }
    
    
    
    increment(){
        const {value} = this.addNum
        store.dispatch({type: 'increment',data: value*1})
    }
    decrement(){
        const {value} = this.addNum
        store.dispatch({type: 'decrement',data: value*1})
    }
    incrementIfOdd(){
        if(store.getState() % 2 !== 0){
            const {value} = this.addNum
            store.dispatch({type: 'increment',data: value*1})
        }
    }
    incrementIfAsync(){
        const {value} = this.addNum
        store.dispatch(()=>{
            setTimeout(()=>{
                store.dispatch({type: 'increment',data: value*1})
            },500)
        })
    }

    render() {
        return (
            <div>
                <p>{store.getState() }</p>
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
