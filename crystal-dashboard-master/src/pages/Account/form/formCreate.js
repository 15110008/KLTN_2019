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
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form layout="horizontal">
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Bạn phải nhập email' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Bạn phải nhập mật khẩu' }],
                        })(<Input type='password' />)}
                    </Form.Item>
                    <Form.Item label="Tên">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Bạn phải nhập tên' }],
                        })(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
