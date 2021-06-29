import React from 'react'

class Btn extends React.Component{
    constructor(props){
        super(props)
        this.state = {isToggle: true}
        this.handleClick = this.handleClick.bind(this)//为了能在handleClick中使用this
    }

    handleClick(e,num){
        console.log(e)
        console.log(num)
    }

    

    render(){
        const isToggle = this.state.isToggle
        return(
            
            <div>
                <button onClick={this.handleClick.bind(this, 111)}>点我</button>
            </div>
        )
    }
}

export default Btn
