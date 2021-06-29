import React, { PureComponent } from 'react'

export default class LifeCycle extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
             count: 0
        }
        this.handleClick = this.handleClick.bind(this)
        console.log('构造函数');
    }
    componentDidMount() {
        console.log('componentDidMount挂载完成');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate更新完毕')
    }
    componentWillUnmount() {
        console.log('componentWillMount卸载');
    }

    handleClick(){
        this.setState({
            count: this.state.count+1
        })
    }
    
    
    render() {
        console.log('render渲染')
        let count = this.state.count
        return (
            <div>
                <button onClick={this.handleClick}>+1</button>
                {
                    count<=3
                    ?  <IContent count={count}/>
                    :  <p>超过3次</p>
                }
            </div>
        )
    }
}
class IContent extends PureComponent{

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    componentWillUnmount() {
        console.log('componentWillMount卸载');
    }

    render(){
        let count = this.props.count
        return(
            <div>
               次数：{count}
            </div>
        )
    }
    
}