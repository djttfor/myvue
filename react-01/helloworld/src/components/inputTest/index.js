import React, { PureComponent } from 'react'

export default class InputTest extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            t: '',
            cb: true,
            ta: '',
            sex: '1'
        }
        this.handleChange = this.handleChange.bind(this)
    }

    
    
    handleChange(e){
        let target = e.target
        let name = target.name
        let type = target.type
        let value;
        if(type === 'checkbox'){
            value = target.checked
        }else if(type === 'radio'){
            value = target.value
        }else{
            value = target.value
        }

        this.setState({
            [name]: value
        })
    }
    


    render() {
        return (
            <div>
                普通文本：<input type="text" name='t' value={this.state.t} onChange={this.handleChange} /><br />
                复选框： <input type="checkbox" name='cb' checked={this.state.cb} onChange={this.handleChange}/><br />
                文本域: <input type="textarea" name='ta'value={this.state.ta} onChange={this.handleChange} /><br />
                男 <input type="radio" name='sex' value='1' onChange={this.handleChange} checked={this.state.sex==='1'}/>
                女 <input type="radio" name='sex' value='0' onChange={this.handleChange} /><br />
               <p>{this.state.t}</p>
               <p>{this.state.cb?'true':'false'}</p>
               <p>{this.state.ta}</p>
               <p>{this.state.sex}</p>
            </div>
        )
    }
}
