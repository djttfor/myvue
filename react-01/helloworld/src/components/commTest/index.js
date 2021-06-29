import React, { PureComponent } from 'react'

export default class Parent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        this.getCount = this.getCount.bind(this)
    }

    getCount = (count) => {
        this.setState({
            count: count
        })
    }

    render() {
        return (
            <div>
                <Son1 count={this.state.count}></Son1>
                <Son2 getCount={this.getCount}></Son2>
            </div>
        )
    }
}
class Son1 extends PureComponent {

    render() {
        return (
            <div>
                这是Son1:{this.props.count}
            </div>
        )
    }
}
class Son2 extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            count: 10086
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            count: this.state.count + 1
        })
    }

    componentDidMount() {
        this.props.getCount(this.state.count)
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.getCount(this.state.count)
    }



    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Son2:{this.state.count}</button>
            </div>
        )
    }
}
