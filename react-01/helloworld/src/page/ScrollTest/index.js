import React, { Component } from 'react'
import { BackTop } from 'antd';
export default class ScrollTest extends Component {
    render() {
        return (
            <div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>           
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaa</div>
                <BackTop />
                Scroll down to see the bottom-right
                <strong className="site-back-top-basic"> gray </strong>
                button.
            </div>
        )
    }
}
