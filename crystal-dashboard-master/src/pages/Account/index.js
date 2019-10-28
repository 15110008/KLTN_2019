import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, Button } from 'antd';
import FormEdit from './form/FormEdit'

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
            <button className='btn btn-detail' style={{ marginRight: '10px' }} onClick={() => this.setState({ formDetail: true })}>Chi tiết</button>
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
      this.setState({ loading: false, formEdit: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ formEdit: false, formDetail: false });
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
        <Table columns={this.columnDefs} dataSource={this.state.data} />
        <Modal
          visible={this.state.formEdit}
          title="Cập nhật account"
          centered
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              Lưu
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <FormEdit id={this.state.id} />
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
          <FormEdit />
        </Modal>
      </div >
    );
  }
}
