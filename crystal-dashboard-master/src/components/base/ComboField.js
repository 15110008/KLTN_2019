import React, { Component } from 'react'
import { Select } from 'antd';

const { Option } = Select;


export default class ComboField extends Component {
    render() {
        return (
            <Select defaultValue={this.props.defaultValue} onChange={this.props.onChange}>
                {this.props.options.map(x => {
                    return <Option value={x.value}>{x.label}</Option>
                })}
            </Select>
        )
    }
}
