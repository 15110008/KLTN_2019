import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, Button, notification } from 'antd';
import FormEdit from './form/FormEdit'
import FormCreate from './form/FormCreate'
import _ from 'lodash'

export default class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
      ]
    }
    this.columnDefs = [
      {
        title: 'Id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'images',
        key: 'images',
      },
      {
        title: 'Mô tả',
        key: 'description',
        dataIndex: 'description',
      },
      {
        title: 'Kinh độ',
        key: 'longitude',
        dataIndex: 'longitude',
      },
      {
        title: 'Vĩ độ',
        key: 'latitude',
        dataIndex: 'latitude',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <button className='btn btn-detail' style={{ marginRight: '10px' }} onClick={() => this.setState({ formDetail: true, id: record._id })}>Chi tiết</button>
            <button className='btn btn-edit' onClick={() => this.setState({ formEdit: true, id: record._id })}>Sửa</button>
            <button className='btn btn-delete' onClick={() => this.onDelete()}>Xóa</button>
          </div>
        ),
      },
    ];


  }

  componentDidMount() {
    this.loadData()
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, formEdit: false, formCreate: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ formEdit: false, formDetail: false, formCreate: false });
  };

  loadData() {
    // Axios.get('http://localhost:3000/v1/place')
    //   .then((response) => {
    //     if (response.data.success) {
    //       this.setState({
    //         data: response.data.data
    //       })
    //     } else {
    //     }
    //   }).catch(error => {
    //     console.log("TCL: formLogin -> onSubmit -> error", error)
    //   });
  }

  onSaveCreate() {
    const token = localStorage.getItem('jwt')
    const params = {
      headers: { jwt: token },
    }
    const data = this.formCreateRef.formRef.getFieldsValue()
    console.log("TCL: Place -> onSaveCreate -> data", data)

    this.formCreateRef.formRef.validateFields(err => {
      if (!err) {
        Axios.post('http://localhost:3000/v1/place', data, params)
          .then((res) => {
            if (res.data.success) {
              notification['success']({
                message: 'Tạo mới thành công',
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
              this.loadData()
              this.setState({
                formCreate: false
              })
            } else {
              notification['error']({
                message: res.data.message,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
            }
          })
      }
    });
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '90%',
          margin: 'auto'
        }}
      >
        <div className='row'>
          <div className='col-md-10'></div>
          <div className='col-md-2'>
            <button className='btn btn-create' onClick={() => this.setState({ formCreate: true })}>
              <i className="fa fa-plus" aria-hidden="true" style={{ marginRight: '5px' }}></i>
              Tạo mới
            </button>
          </div>
        </div>
        <Table columns={this.columnDefs} dataSource={this.state.data} />
        <Modal
          visible={this.state.formCreate}
          title="Cập nhật account"
          width={700}
          centered
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={() => this.onSaveCreate()}>
              Lưu
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <FormCreate ref={c => this.formCreateRef = c} />
        </Modal>
        <Modal
          visible={this.state.formEdit}
          title="Cập nhật account"
          centered
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={() => this.onSaveEdit()}>
              Lưu
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <FormEdit ref={c => this.formEditRef = c} id={this.state.id} />
        </Modal>
        <Modal
          visible={this.state.formDetail}
          title="Chi tiết"
          centered
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <FormEdit ref={c => this.formDetailRef = c} id={this.state.id} readOnly={true} />
        </Modal>
      </div>
    );
  }
}
