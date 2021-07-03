import React, { Component } from 'react'
import { hello } from '../../api/user';


export default class AxiosTest extends Component {

    handleClick(){
        hello().then(resp=>{
            console.log(resp)
        },error=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>点我发请求</button>
            </div>
        )
    }
}
