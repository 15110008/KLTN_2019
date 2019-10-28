import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';

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
            <button className='btn btn-detail' style={{ marginRight: '10px' }}>Chi tiết</button>
            <button className='btn btn-edit'>Sửa</button>
            <button className='btn btn-delete'>Xóa</button>
          </div>
        ),
      },
    ];


  }

  componentDidMount() {
    this.loadData()
  }

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
      </div>
    );
  }
}
