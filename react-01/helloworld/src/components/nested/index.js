import React, { PureComponent } from 'react'

export default class NestedTest extends PureComponent {
    render() {
        return (
            <div>
                <div>
                    {this.props.left}
                </div>
                <div>
                    {this.props.right}
                </div>
            </div>
        )
    }
}
