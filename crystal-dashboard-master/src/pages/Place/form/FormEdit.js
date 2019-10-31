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
        this.loadData(this.props.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id != this.props.id) {
            this.loadData(nextProps.id)
        }
    }

    loadData(id) {
        axios.get('http://localhost:3000/v1/place/' + id)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    const formData = {
                        id: id,
                        email: data.email ? data.email : null,
                        name: data.name ? data.name : null,
                        phone: data.phone ? data.phone : null,
                    }
                    console.log("TCL: FormEdit -> loadData -> formData", formData)
                    this.formRef.setFieldsValue(formData);
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
                    <Form.Item label="Id">
                        {getFieldDecorator('_id', {
                        })(<Input disabled={true} />)}
                    </Form.Item>
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Bạn phải nhập email' }],
                        })(<Input readOnly />)}
                    </Form.Item>
                    <Form.Item label="Tên">
                        {getFieldDecorator('name')(<Input readOnly={this.props.readOnly} type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        {getFieldDecorator('phone')(<Input readOnly={this.props.readOnly} />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
