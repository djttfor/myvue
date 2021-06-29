import React, { PureComponent } from 'react'

export default class First extends PureComponent {
    render() {
        return (
            <div>
                这是First页面
                <button onClick={()=>{this.props.history.go(-1)}}>返回上一页</button>
            </div>
        )
    }
}
