import { Button, Form, Icon, Input, Upload } from 'antd';
import React, { Component } from 'react';
import axios from 'axios'


export default class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationOption: []
        };

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
        }

        render() {
            const props = {
                action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                listType: 'picture',
            };
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
                    <Form.Item {...formItemLayout} label="Tên điểm đến" >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Bạn phải nhập tên đia điểm' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Kinh độ">
                        {getFieldDecorator('longitude')(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Vĩ độ">
                        {getFieldDecorator('latitude')(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Hình ảnh">
                        {getFieldDecorator('images')(
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Tải hình ảnh
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mô tả">
                        {getFieldDecorator('description')(<TextArea rows={4} />)}
                    </Form.Item>
                </Form>
            );
        }
    },
);
