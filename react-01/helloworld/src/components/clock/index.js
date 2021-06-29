import React from 'react'

class IClock extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            flag: true
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({
                date: new Date(),
                flag: !this.state.flag
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    componentDidUpdate() {
        console.log(this.state.flag)
    }




    render() {
        const flag = this.state.flag
        return (
            <div>
                <h2 style={{display: flag?'':'none'}}>
                    当前时间：{this.state.date.toLocaleTimeString()}
                </h2>
            </div>
        )
    }
}

export default IClock