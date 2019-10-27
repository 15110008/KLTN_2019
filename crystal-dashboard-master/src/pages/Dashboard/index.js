import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        key: 'phone',
        dataIndex: 'phone',
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
    Axios.get('http://localhost:3000/v1/accounts')
      .then((response) => {
        if (response.data.success) {
          console.log("TCL: Dashboard -> loadData -> response", response)
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
