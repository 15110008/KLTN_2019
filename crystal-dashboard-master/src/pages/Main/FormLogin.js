import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Input, Icon, Button, notification } from 'antd';
import axios from 'axios'

export default class FormLogin extends Component {
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
                    onCloseModal={this.props.onCloseModal}
                />
            </div>
        );
    }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {

        onClose() {
            this.props.onCloseModal && this.props.onCloseModal()
        }
        handleSubmit = e => {
            e.preventDefault();
            const data = this.props.form.getFieldsValue()
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    axios.post('http://localhost:3000/v1/account/login', data).then(response => {
                        if (response.data.success) {
                            if (response.data.meta.name == 'Admin') {
                                this.onClose()
                                localStorage.setItem('jwt', response.data.result.jwt);
                            }
                        } else {
                            notification['error']({
                                message: response.data.message,
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                        }
                    }).catch(error => {
                        console.log("TCL: formLogin -> onSubmit -> error", error)
                    });
                }
            });
        };

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Vui lòng nhận email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Vui lòng nhận mật khẩu!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Mật khẩu"
                            />,
                        )}
                    </Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                </Form>
            );
        }
    },
);
