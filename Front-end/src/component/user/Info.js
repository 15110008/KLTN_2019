import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import Axios from 'axios';
import FormInfo from './FormInfo';
import './style.scss'

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        const headers = {
            headers: { jwt: token },
        }
        Axios.get('http://localhost:3000/v1/account/me', headers)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    const formData = {
                        email: data.email ? data.email : null,
                        name: data.name ? data.name : null,
                        phone: data.phone ? data.phone : null,
                    }
                    this.setState({
                        data: data
                    })
                    this.formRef.setFieldsValue(formData);
                }
            }).catch((err) => {
                console.log("TCL: Info -> componentDidMount -> err", err)
            })
    }

    render() {
        return (
            <div className='container info' style={{ paddingTop: 50 }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CollectionCreateForm
                        ref={c => this.formRef = c}
                        wrappedComponentRef={this.saveFormRef}
                        data={this.state.data}
                    />
                </div>
            </div>
        )
    }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
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
        handleCancel() {
            this.setState({ visible: false });
        };

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
                        })(<Input readOnly={true} disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Họ và tên">
                        {getFieldDecorator('name')(<Input readOnly={true} type="textarea" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input readOnly={true} />)}
                    </Form.Item>
                    <div style={{
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Button style={{
                            marginRight: '24px',
                            marginLeft: '-31px'
                        }} onClick={() => {
                            this.setState({
                                visible: true,
                                type: 'info',
                                title: 'Chỉnh sửa thông tin'
                            })
                        }} type="primary">Chỉnh sửa thông tin</Button>
                        <Button onClick={() => {
                            this.setState({
                                visible: true,
                                type: 'password',
                                title: 'Đổi mật khẩu'
                            })
                        }} type="danger">Đổi mật khẩu</Button>
                    </div>
                    <Modal
                        visible={this.state.visible}
                        title={this.state.title}
                        centered
                        footer={null}
                        onCancel={() => this.handleCancel()}

                    >
                        <FormInfo ref={c => this.formInfoRef = c} handleCancel={() => this.handleCancel()} type={this.state.type} data={this.props.data} />
                    </Modal>
                </Form>
            );
        }
    },
);

