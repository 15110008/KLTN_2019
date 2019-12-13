import { Button, Form, Icon, Input, Upload, Modal } from 'antd';
import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'


export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationOption: [],
            fileList: []
        };
    }

    async componentDidMount() {
        await this.loadData(this.props.id)
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            fileList: []
        })
        await axios.get('http://localhost:3000/v1/destination/' + nextProps.id)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    const listImage = []
                    if (_.isEmpty(data.images)) {
                        this.formRef.setFields({
                            images: {
                                value: []
                            }
                        })
                    } else {
                        data.images.map((x, index) => {
                            listImage.push({
                                thumbUrl: 'http://localhost:3000/' + x,
                                status: 'done',
                                name: x.split('\\')[1] ? x.split('\\')[1] : x.split('/')[1],
                                uid: 'image_' + index
                            })
                        })
                    }
                    this.setState({
                        fileList: listImage
                    })
                    this.formRef.setFieldsValue(data);
                }
            }).catch((error) => {
                console.log("TCL: FormEdit -> componentWillReceiveProps -> error", error)
            })
    }

    async loadData(id) {
        this.formRef.resetFields()
        await axios.get('http://localhost:3000/v1/destination/' + id)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    const listImage = []
                    if (_.isEmpty(data.images)) {
                        this.formRef.setFields({
                            images: {
                                value: []
                            }
                        })
                    } else {
                        data.images.map((x, index) => {
                            listImage.push({
                                thumbUrl: 'http://localhost:3000/' + x,
                                status: 'done',
                                name: x.split('\\')[1] ? x.split('\\')[1] : x.split('/')[1],
                                uid: 'image_' + index
                            })
                        })
                    }
                    console.log("TCL: FormEdit -> loadData -> listImage", listImage)
                    this.setState({
                        fileList: listImage
                    })
                    this.formRef.setFieldsValue(data);
                }
            }).catch((error) => {
                console.log("TCL: FormEdit -> loadData -> error", error)
            })
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
                    fileList={this.state.fileList}
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
                fileList: this.props.fileList,
                previewVisible: false,
                previewImage: '',
                removed: false
            };
        }

        handlePreview = async file => {
            if (!file.thumbUrl && !file.preview) {
                file.preview = await this.getBase64(file.originFileObj);
            }

            this.setState({
                previewImage: file.thumbUrl || file.preview,
                previewVisible: true,
            });
        };

        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        componentWillReceiveProps(nextProps) {
            const data = nextProps.form.getFieldsValue()
            if (!this.state.removed) {
                if (_.isEmpty(data.images)) {
                    this.setState({
                        fileList: []
                    })
                } else {
                    this.setState({
                        fileList: nextProps.fileList
                    })
                }
            }
        }

        handleCancel = () => this.setState({ previewVisible: false });

        render() {
            const { formLayout, fileList, previewImage, previewVisible } = this.state;
            const props = {
                listType: 'picture',
                onPreview: this.handlePreview,
                onRemove: file => {
                    this.setState(state => {
                        const index = state.fileList.indexOf(file);
                        const newFileList = state.fileList.slice();
                        newFileList.splice(index, 1);
                        return {
                            fileList: newFileList,
                            removed: true
                        };
                    });
                },
                beforeUpload: file => {
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                    }));
                    return false;
                },
                fileList,
            };
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
                <div>
                    <Form layout={formLayout} labelAlign="left">
                        <Form.Item {...formItemLayout} label="Tên điểm đến" >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Bạn phải nhập tên đia điểm' }],
                            })(<Input readOnly={this.props.readOnly} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Kinh độ">
                            {getFieldDecorator('longitude')(<Input readOnly={this.props.readOnly} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Vĩ độ">
                            {getFieldDecorator('latitude')(<Input readOnly={this.props.readOnly} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Hình ảnh">
                            {getFieldDecorator('images')(
                                <Upload multiple={true} {...props}>
                                    <Button>
                                        <Icon type="upload" /> Tải hình ảnh
                                </Button>
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Mô tả">
                            {getFieldDecorator('description')(<TextArea rows={4} readOnly={this.props.readOnly} />)}
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

