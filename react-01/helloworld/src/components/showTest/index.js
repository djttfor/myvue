import React, {PureComponent} from "react"

class Text extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        if (!this.props.isShow) {
            return null
        }
        return(
            <div>今晚打老虎</div>
        )
    }
}

class ShowTest extends PureComponent{
    constructor(props){
        super(props)
        this.state = {isShow: true}
        this.handleToggleShow = this.handleToggleShow.bind(this)
    }
    handleToggleShow(){
        this.setState(state => ({
            isShow : !state.isShow
        }))
    }
    render(){
        return(
            <div>
                <Text isShow={this.state.isShow}/>
                <button onClick={this.handleToggleShow}>切换</button>
            </div>
        )
    }
}

export default ShowTest