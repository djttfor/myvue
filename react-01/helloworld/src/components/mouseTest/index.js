import React, { PureComponent } from 'react'
import { Img } from './style'



export default class MouseTest extends PureComponent {
    render() {
        return (
            <div
                style={{ height: '900px', border: '1px solid red', }}             
            >
                <Mouse render={(mouse)=>{
                    return(
                        <p>{'x:'+mouse.x+',y:'+mouse.y}</p>
                    )
                }}/>
                <Mouse render={(mouse)=>{
                    return(
                        <div style={{ height: '300px', border: '1px solid red'}}   >
                             <Img style={{ left:(mouse.x-50)+ 'px',top:(mouse.y-50)+'px' }}/>
                        </div>
                    )
                }}/>
            </div>
        )
    }
}
class Mouse extends PureComponent{
    constructor(props) {
        super(props)

        this.state = {
            x: 0,
            y: 0
        }
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    handleMouseMove(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })

    }

    componentDidMount() {
        window.addEventListener('mousemove',this.handleMouseMove)
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove',this.handleMouseMove)
    }
    
    
    
    render() {
        return this.props.render(this.state)
    }
}