import React from 'react'
import ReactDom from 'react-dom'

class Welcome extends React.Component {
    render() {
        return <h1>姓名：{this.props.name},年龄：{this.props.age-15}</h1>
    }
}

const welcome = <Welcome name="张三" age={17}></Welcome>

ReactDom.render(welcome,document.getElementById('root'))
