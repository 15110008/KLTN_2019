import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Input, Modal, Col, Select } from 'antd';
import axios from 'axios'
import ComboField from '../../../components/base/ComboField';

const { Option } = Select;

export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationOption: []
        };

    }

    async componentDidMount() {
        await this.loadComboBox()
        await this.loadData(this.props.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id != this.props.id) {
            this.loadData(nextProps.id)
        }
    }

    async loadComboBox() {
        await axios.get('http://localhost:3000/v1/destination')
            .then((res) => {
                const data = res.data.data
                const destinationOption = []
                data.map(x => {
                    destinationOption.push({
                        value: x._id,
                        label: x.name
                    })
                })
                this.setState({
                    destinationOption: destinationOption
                })
            }).catch((error) => {

            })
    }


    async loadData(id) {
        this.formRef.resetFields()
        await axios.get('http://localhost:3000/v1/place/' + id)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    data.category = parseInt(data.category)
                    this.formRef.setFieldsValue(data);
                    this.setState({
                        valueCategory: parseInt(data.category),
                        valueDestinationId: data.destinationId
                    })
                }
            }).catch((error) => {
            })
    }

    render() {
        return (this.state.destinationOption ?
            <div>
                <CollectionCreateForm
                    ref={c => this.formRef = c}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    readOnly={this.props.readOnly}
                    destinationOption={this.state.destinationOption}
                    valueCategory={this.state.valueCategory}
                    valueDestinationId={this.state.valueDestinationId}
                />
            </div> : ''
        );
    }
}
const { TextArea } = Input

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formLayout: 'horizontal',
                destinationOption: []
            };
            this.optionCategory = [
                { value: 1, label: 'Du lịch văn hóa' },
                { value: 2, label: 'Du lịch ẩm thực' },
                { value: 3, label: 'Du lịch tham quan' },
                { value: 4, label: 'Du lịch nghỉ dưỡng' },
            ]
        }

        render() {
            const { formLayout } = this.state;
            const formItemLayout =
                formLayout === 'horizontal'
                    ? {
                        labelCol: { span: 5 },
                        wrapperCol: { span: 17 },
                    }
                    : null;
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form layout={formLayout} labelAlign="left">
                    <Form.Item {...formItemLayout} label="Tên địa điểm" >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Bạn phải nhập tên đia điểm' }],
                        })(<Input readOnly={this.props.readOnly} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Điểm đến" >
                        {getFieldDecorator('destinationId', {
                            rules: [{ required: true, message: 'Bạn phải chọn điểm đến' }],
                            initialValue: this.props.valueDestinationId
                        })(<Select readOnly={this.props.readOnly} onChange={this.props.onChange}>
                            {this.props.destinationOption && this.props.destinationOption.map((x, index) => {
                                return <Option key={index} value={x.value}>{x.label}</Option>
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Địa chỉ">
                        {getFieldDecorator('location')(<Input readOnly={this.props.readOnly} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Loại hình du lịch">
                        {getFieldDecorator('category', {
                            initialValue: this.props.valueCategory
                        })(<Select readOnly={this.props.readOnly} onChange={this.props.onChange}>
                            {this.optionCategory && this.optionCategory.map((x, index) => {
                                return <Option key={index} value={x.value}>{x.label}</Option>
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Giá cả">
                        {getFieldDecorator('price')(<Input readOnly={this.props.readOnly} type='number' />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input readOnly={this.props.readOnly} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Kinh độ">
                        {getFieldDecorator('longitude')(<Input readOnly={this.props.readOnly} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Vĩ độ">
                        {getFieldDecorator('latitude')(<Input readOnly={this.props.readOnly} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mô tả">
                        {getFieldDecorator('description')(<TextArea rows={4} readOnly={this.props.readOnly} />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
