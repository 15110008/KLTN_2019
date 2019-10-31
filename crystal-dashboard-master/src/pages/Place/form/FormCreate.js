import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Input, Modal, Col } from 'antd';
import axios from 'axios'
import ComboField from '../../../components/base/ComboField';

export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                <CollectionCreateForm
                    ref={c => this.formRef = c}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    readOnly={this.props.readOnly}
                />
            </div>
        );
    }
}
const { TextArea } = Input;

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



        componentDidMount() {
            this.loadComboBox()
        }

        loadComboBox() {
            axios.get('http://localhost:3000/v1/destination')
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

        onChange(val) {
            console.log("TCL: extends -> onChange -> val", val)

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
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Điểm đến" >
                        {getFieldDecorator('destinationId', {
                            rules: [{ required: true, message: 'Bạn phải chọn điểm đến' }],
                        })(<ComboField options={this.state.destinationOption} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Địa chỉ">
                        {getFieldDecorator('location')(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Loại hình du lịch">
                        {getFieldDecorator('category')(<ComboField options={this.optionCategory}
                        />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mô tả">
                        {getFieldDecorator('description')(<TextArea />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Kinh độ">
                        {getFieldDecorator('longitude')(<Input readOnly />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Vĩ độ">
                        {getFieldDecorator('latitude')(<Input readOnly />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
