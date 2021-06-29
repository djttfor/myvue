import React, {PureComponent} from "react"
import { DivComponent } from "./style"

class DivTest extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        const names = this.props.names
        const liNames = names.map((v) =>
            <li key={v.toString()}>
                <a href="#">{v.toUpperCase()}</a>
            </li>
        )
        return(
            <DivComponent>
                <ul>
                    <li>
                        <a href="#">首页</a>
                    </li>
                    {liNames}
                    <li>
                        <a href="#">本地书签</a>
                    </li>
                </ul>
            </DivComponent>
        )
    }
}

export default DivTest