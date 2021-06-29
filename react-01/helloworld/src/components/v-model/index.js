import React, { PureComponent } from 'react'

export default class VModel extends PureComponent {
    constructor(props) {
        super(props)
        this.state = { rmb: '',dol: '' }
        this.rmbChange = this.rmbChange.bind(this)
        this.dolChange = this.dolChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    rmbChange(e) {
        this.setState({
            rmb: e.target.value,
            dol: this.subNum(e.target.value/this.props.exchangeRate)
        })
    }

    dolChange(e) {
        this.setState({
            rmb: this.subNum(e.target.value*this.props.exchangeRate),
            dol: e.target.value
        })
    }

    subNum(num){
        if((!num || !num instanceof Number)){
            console.log(num)
            return ''
        }
        let str = num.toString()
        let index = str.indexOf('.')
        if(index === -1 || (str.substring(index+1,str.length).length<=4)){
            return str
        }
        return str.substring(0,index)+'.'+str.substring(index+1,index + 5)
    }

    handleSubmit(e) {
        alert(this.state.value)
        e.preventDefault()
    }

    render() {
        let rmb = this.state.rmb
        let dol = this.state.dol
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                RMB:<input type="text" value={rmb} onChange={this.rmbChange} />
                <br />
                dollar:<input type="text" value={dol} onChange={this.dolChange} />
                <br />
                    <input type="submit" value="提交"/>
                </form>
            </div>
        )
    }
}
