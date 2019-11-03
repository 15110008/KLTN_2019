import React, { Component } from 'react'
import { Select } from 'antd';

const { Option } = Select;


export default class ComboField extends Component {
    render() {
        return (
            <Select onChange={this.props.onChange}>
                {this.props.options && this.props.options.map((x, index) => {
                    return <Option key={index} value={x.value}>{x.label}</Option>
                })}
            </Select>
        )
    }
}
