import React, { PureComponent } from 'react'
import { Select } from 'element-react'

export class SelectTest extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: 0
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <div>
                <Select value={this.state.value} placeholder="请选择" onChange={this.handleChange}>
                    {
                        this.state.options.map((el, i) => {
                            return <Select.Option key={el.value} label={el.label} value={i} />
                        })
                    }
                </Select>
                <p>{this.state.options[this.state.value].label}</p>
            </div>
        )
    }
}
