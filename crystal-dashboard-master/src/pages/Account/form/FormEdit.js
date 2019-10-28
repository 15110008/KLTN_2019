import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Input, Modal, Radio } from 'antd';
import axios from 'axios'

export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        axios.get('http://localhost:3000/v1/account/' + this.props.id)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    const formData = {
                        email: data.email ? data.email : null,
                        name: data.name ? data.name : null,
                        phone: data.phone ? data.phone : null,
                    }
                    this.formRef.setFieldsValue(formData);
                    console.log(this.formRef)

                }
            })
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
                        })(<Input readOnly />)}
                    </Form.Item>
                    <Form.Item label="Tên">
                        {getFieldDecorator('name')(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
