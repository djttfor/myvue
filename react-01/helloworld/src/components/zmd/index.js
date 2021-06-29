import React, { PureComponent } from 'react'
import { Carousel } from 'element-react'
import { SelectWrapper } from './style'

export default class Zmd extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: 0,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(currIndex,prevIndex){
        this.setState({
            activeIndex: currIndex
        })
    }


    render() {
        return (
            <SelectWrapper>
                <Carousel 
                interval="4000" 
                type="card" 
                height="200px" 
                onChange={this.handleChange}
                >
                    {
                        [1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                                <Carousel.Item key={index} >
                                    <div 
                                    className={this.state.activeIndex===index?'subCard subCardColor':'subCard'}
                                    >
                                        {item}
                                    </div>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </SelectWrapper>
        )
    }
}
