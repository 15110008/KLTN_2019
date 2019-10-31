import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, Button, notification } from 'antd';
import FormEdit from './form/FormEdit'
import FormCreate from './form/formCreate'

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formEdit: false,
      formDetail: false,
      data: [
        {
          key: '1',
          id: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Số điện thoại',
        key: 'phone',
        dataIndex: 'phone',
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

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, formEdit: false, formCreate: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ formEdit: false, formDetail: false, formCreate: false });
  };

  componentDidMount() {
    this.loadData()
  }



  loadData() {
    Axios.get('http://localhost:3000/v1/accounts')
      .then((response) => {
        if (response.data.success) {
          console.log("TCL: Account -> loadData -> response.data.data._id", response.data.data)
          this.setState({
            data: response.data.data,
          })
        } else {
        }
      }).catch(error => {
        console.log("TCL: formLogin -> onSubmit -> error", error)
      });
  }

  onSaveEdit() {
    const data = this.formEditRef.formRef.getFieldsValue()
    const token = localStorage.getItem('jwt')
    const params = {
      headers: { jwt: token },
    }
    this.formEditRef.formRef.validateFields(err => {
      if (!err) {
        Axios.put('http://localhost:3000/v1/account/' + this.state.id, data, params)
          .then((res) => {
            if (res.data.success) {
              notification['success']({
                message: 'Lưu thành công',
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
              this.loadData()
              this.setState({
                formEdit: false
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

  onSaveCreate() {
    const data = this.formCreateRef.formRef.getFieldsValue()
    this.formCreateRef.formRef.validateFields(err => {
      if (!err) {
        Axios.post('http://localhost:3000/v1/account', data)
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
      </div >
    );
  }
}
