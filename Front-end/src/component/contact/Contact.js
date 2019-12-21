import { Button, Form, Input, notification } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import TopArea from '../topArea';
import './style.scss';
const { TextArea } = Input

export default class Contact extends Component {

    onClick() {
        this.formRef.validateFields(err => {
            if (!err) {
                const data = this.formRef.getFieldsValue()
                const params = {
                    name: data.name,
                    Title: data.subject,
                    Content: data.content
                }
                Axios.post('http://localhost:3000/v1/send-mail', params)
                    .then((res) => {
                        notification['success']({
                            message: 'Gửi phản hồi thảnh công!',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    })
                    .catch((err) => {
                        console.log("TCL: Contact -> onClick -> err", err)
                        notification['error']({
                            message: 'Lỗi kết nối server',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    })
            }
        });
    }

    render() {
        return (
            <div>
                <TopArea />
                <section class="ftco-section contact-section user">
                    <div class="container">
                        <div class="row d-flex mb-5 contact-info justify-content-center">
                            <div class="col-md-8">
                                <div class="row mb-5">
                                    <div class="col-md-4 text-center py-4">
                                        <div class="icon">
                                            <span class="icon-map-o"></span>
                                        </div>
                                        <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                                    </div>
                                    <div class="col-md-4 text-center border-height py-4">
                                        <div class="icon">
                                            <span class="icon-mobile-phone"></span>
                                        </div>
                                        <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                    </div>
                                    <div class="col-md-4 text-center py-4">
                                        <div class="icon">
                                            <span class="icon-envelope-o"></span>
                                        </div>
                                        <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row block-9 justify-content-center mb-5">
                            <div class="col-md-8 mb-md-5">
                                <h2 class="text-center">Liên hệ với chúng tôi <br />Chúng tôi có thẻ giúp gì cho bạn?</h2>
                                <form action="#" class="bg-light p-5 contact-form">

                                    {/* <form action="#" class="bg-light p-5 contact-form">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Your Name">
              </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Your Email">
              </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Subject">
              </div>
                                                <div class="form-group">
                                                    <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Message"></textarea>
                                                </div>
                                                <div class="form-group">
                                                    <input type="submit" value="Send Message" class="btn btn-primary py-3 px-5">
              </div>
            </form> */}
                                    <CollectionCreateForm
                                        ref={c => this.formRef = c}
                                        wrappedComponentRef={this.saveFormRef}
                                        onClick={() => this.onClick()}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
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
                <div style={{ width: '50%' }}>
                    <Form layout={formLayout} labelAlign="left">
                        <Form.Item {...formItemLayout} label="Họ và tên" >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Bạn phải nhập họ tên' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Tiêu đề" >
                            {getFieldDecorator('subject', {
                                rules: [{ required: true, message: 'Bạn phải nhập tiêu đề' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Nội dung">
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: 'Bạn phải nhập nội dung' }],
                            })(<TextArea rows={7} />)}
                        </Form.Item>
                    </Form>
                    <div style={{
                        display: 'flex', justifyContent: 'center', width: 700
                    }}>
                        <Button style={{
                            width: '150px',
                            height: '50px',
                            fontSize: '18px',
                        }} onClick={this.props.onClick} type="primary">Gửi</Button>

                    </div>
                </div >
            );
        }
    },
);