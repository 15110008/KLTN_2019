import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Input, Modal, Radio } from 'antd';
import axios from 'axios'

export default class FormCreate extends Component {
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

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formLayout: 'horizontal',
            };
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
                    <Form.Item {...formItemLayout} label="Email" >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Bạn phải nhập email' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mật khẩu" >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Bạn phải nhập mật khẩu' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Tên">
                        {getFieldDecorator('name')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
