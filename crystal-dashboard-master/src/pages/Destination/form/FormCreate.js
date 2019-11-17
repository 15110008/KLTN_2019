import { Button, Form, Icon, Input, Upload, Modal } from 'antd';
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
                destinationOption: [],
                previewVisible: false,
                previewImage: '',
            };
        }

        handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await this.getBase64(file.originFileObj);
            }

            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
            });
        };

        handleCancel = () => this.setState({ previewVisible: false });

        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        // request(res) {
        //     const token = localStorage.getItem('jwt')
        //     const params = {
        //         headers: { jwt: token },
        //     }
        //     console.log("TCL: extends -> request -> file", res)
        //     axios.post(res.action, res.file).then((response) => {
        //         console.log("TCL: extends -> request -> response", response)
        //         // if (res.data.success) {

        //         // }
        //     }).catch((error) => {
        //     })
        // }

        render() {
            const props = {
                action: 'http://localhost:3000/v1/destination/insert-image',
                listType: 'picture',
                onPreview: this.handlePreview
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
            const { previewVisible, previewImage } = this.state;
            return (
                <div>
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
                                <Upload {...props} customRequest={this.request}>
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
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            );
        }
    },
);
