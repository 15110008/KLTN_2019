import React, { Component } from 'react'
import { Form, Button, Input, notification } from 'antd'
import axios from 'axios'
import './style.scss'

export default class FormInfo extends Component {

    callDataPassword() {
        return this.formPassword.getFieldsValue()
    }

    callDataInfo() {
        return this.formInfo.getFieldsValue()
    }

    checkValidatePassword() {
        let validate = false
        this.formPassword.validateFields(err => {
            if (!err) {
                validate = true
            } else {
                validate = false
            }
        })
        return validate
    }

    componentDidMount() {
        const { data } = this.props
        const formData = {
            email: data.email ? data.email : null,
            name: data.name ? data.name : null,
            phone: data.phone ? data.phone : null,
        }
        this.formInfo && this.formInfo.setFieldsValue(formData)
    }


    render() {
        if (this.props.type == 'info') {
            return (
                <div className='container form-info'>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CollectionCreateFormInfo
                            ref={c => this.formInfo = c}
                            wrappedComponentRef={this.saveFormRef}
                            callDataInfo={() => this.callDataInfo()}
                            handleCancle={() => this.props.handleCancle()}
                        />
                    </div>
                </div>
            )
        } else {
            return <div className='container form-password'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CollectionCreateFormPassword
                        ref={c => this.formPassword = c}
                        wrappedComponentRef={this.saveFormRef}
                        callDataPassword={() => this.callDataPassword()}
                        checkValidatePassword={() => this.checkValidatePassword()}
                        handleCancle={() => this.props.handleCancle()}
                    />
                </div>
            </div>
        }
    }
}


const CollectionCreateFormPassword = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formLayout: 'horizontal',
                visible: false,
                type: '',
                title: '',
            };
        }

        onSave() {
            const data = this.props.callDataPassword()
            const validate = this.props.checkValidatePassword()
            if (validate) {
                if (data.newPassword == data.newPassword_v2) {
                    const params = {
                        oldPassword: data.oldPassword,
                        newPassword: data.newPassword
                    }
                    const token = localStorage.getItem('jwt')
                    const header = {
                        headers: { jwt: token }
                    }
                    axios.put('http://localhost:3000/v1/account/changepassword', params, header)
                        .then((res) => {
                            if (res.data.success) {
                                window.location.href = 'http://locahost:3006/user/info'
                            }
                        }).catch((err) => {
                            console.log("TCL: extends -> onSave -> err", err)

                        })
                } else {
                    debugger
                    notification['error']({
                        message: 'Mật khẩu nhập lại chưa khớp',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            }
        }

        render() {
            const { formLayout } = this.state;
            const formItemLayout =
                formLayout === 'horizontal'
                    ? {
                        labelCol: { span: 10 },
                        wrapperCol: { span: 13 },
                    }
                    : null;
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form layout={formLayout} labelAlign="left">
                    <Form.Item {...formItemLayout} label="MẬt khẩu cũ">
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: 'Bạn phải nhập mật khẩu cũ' }],
                        })(<Input type="password" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mật khẩu mới" >
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: 'Bạn phải nhập mật khẩu mới' }],
                        })(<Input type="password" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mật khẩu mới lần 2">
                        {getFieldDecorator('newPassword_v2', {
                            rules: [{ required: true, message: 'Bạn phải nhập mật khẩu mới lần 2' }],
                        })(<Input type="password" />)}
                    </Form.Item>
                    <div style={{
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Button onClick={() => this.onSave()} type="primary">Lưu</Button>

                    </div>
                </Form>
            );
        }
    },
);

const CollectionCreateFormInfo = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formLayout: 'horizontal',
                visible: false,
                type: '',
                title: '',
            };
        }

        onSave() {
            const data = this.props.callDataInfo()
            const params = {
                name: data.name,
                phone: data.phone
            }
            const token = localStorage.getItem('jwt')
            const header = {
                headers: { jwt: token }
            }
            axios.put('http://localhost:3000/v1/account', params, header)
                .then((res) => {
                    if (res.data.success) {
                        window.location.href = 'http://locahost:3006/user/info'

                    }
                }).catch((err) => {
                    console.log("TCL: extends -> onSave -> err", err)

                })

        }

        render() {
            const { formLayout } = this.state;
            const formItemLayout =
                formLayout === 'horizontal'
                    ? {
                        labelCol: { span: 10 },
                        wrapperCol: { span: 13 },
                    }
                    : null;
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form layout={formLayout} labelAlign="left">
                    <Form.Item {...formItemLayout} label="Họ và tên">
                        {getFieldDecorator('name')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input />)}
                    </Form.Item>
                    <div style={{
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Button onClick={() => this.onSave()} type="primary">Lưu</Button>

                    </div>
                </Form>
            );
        }
    },
);