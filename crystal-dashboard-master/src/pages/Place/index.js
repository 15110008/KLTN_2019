import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, Button } from 'antd';
import FormEdit from './form/FormEdit'

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
      this.setState({ loading: false, formEdit: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ formEdit: false, formDetail: false });
  };

  loadData() {
    Axios.get('http://localhost:3000/v1/place')
      .then((response) => {
        if (response.data.success) {
          this.setState({
            data: response.data.data
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
            <Button key="submit" type="primary" loading={this.state.loading} onClick={() => this.onSave()}>
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
