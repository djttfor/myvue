import React, { PureComponent } from 'react'
import { DivDemo } from './style'


const { Provider, Consumer } = React.createContext()

export default class ContextTest extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const user = ['aaa','bbb','ccc']
        return (
            <Provider value={user}>
            <DivDemo>
                <div className={'test1'}>
                        <Test2>
                        </Test2>
                </div>
            </DivDemo>
            </Provider>
        )
    }
}

class Test2 extends PureComponent {

    render() {
        return (
            <DivDemo>
                <div className={'test2'}>
                    <Test3></Test3>
                </div>
            </DivDemo>
        )
    }
}
class Test3 extends PureComponent {

    render() {
        return (
            <DivDemo>
                <div className={'test3'}>
                    <Consumer>
                        {data => <span>{data[0]}</span>}
                    </Consumer>
                </div>
            </DivDemo>
        )
    }
}

