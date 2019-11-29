import { Table } from 'antd';
import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, Button, notification } from 'antd';
import FormEdit from './form/FormEdit'
import FormCreate from './form/FormCreate'
import _ from 'lodash'

export default class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      destinationOption: []
    }
    this.optionCategory = [
      { value: 1, label: 'Du lịch văn hóa' },
      { value: 2, label: 'Du lịch ẩm thực' },
      { value: 3, label: 'Du lịch tham quan' },
      { value: 4, label: 'Du lịch nghỉ dưỡng' },
    ]
  }

  columnDefs = [
    {
      title: 'Tên địa điểm',
      width: 150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      width: 420,
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Hình ảnh',
      key: 'image',
      width: 100,
      dataIndex: 'image',
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
          <button className='btn btn-delete' onClick={() => this.onDelete(record._id)}>Xóa</button>
        </div>
      ),
    },
  ];

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
    Axios.get('http://localhost:3000/v1/destination')
      .then((response) => {
        if (response.data.success) {
          var maxLength = 30
          let listImage = []
          const data = response.data.data
          data.map((x, index) => {
            x.description = _.truncate(x.description, {
              'length': 500,
              'separator': /,? +/
            })
            x.image = data[index].images[0]

          })
          console.log("TCL: Destination -> loadData -> listImage", listImage)
          this.setState({
            data: response.data.data,
          })
        } else {
        }
      }).catch(error => {
        console.log("TCL: destination -> loadData -> error", error)
      });
  }

  onDelete(id) {
    const token = localStorage.getItem('jwt')
    const params = {
      headers: { jwt: token },
    }
    Axios.delete('http://localhost:3000/v1/destination/' + id, params)
      .then((response) => {
        if (response.data.success) {
          notification['success']({
            message: 'Xóa thành công',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
          this.loadData()
        } else {
          notification['error']({
            message: response.data.message,
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }
      }).catch(error => {
        console.log("TCL: formLogin -> onSubmit -> error", error)
      });
  }

  async onSaveCreate() {
    const token = localStorage.getItem('jwt')

    const data = this.formCreateRef.formRef.getFieldsValue()
    console.log("TCL: destination -> onSaveCreate -> data", data)
    const params = {
      headers: { jwt: token },
    }
    this.formCreateRef.formRef.validateFields(err => {
      if (!err) {

        // Axios.post('http://localhost:3000/v1/destination', data, params)
        //   .then((res) => {
        //     if (res.data.success) {
        //       notification['success']({
        //         message: 'Tạo mới thành công',
        //         onClick: () => {
        //           console.log('Notification Clicked!');
        //         },
        //       });
        //       this.loadData()
        //       this.setState({
        //         formCreate: false
        //       })
        //     } else {
        //       notification['error']({
        //         message: res.data.message,
        //         onClick: () => {
        //           console.log('Notification Clicked!');
        //         },
        //       });
        //     }
        //   })
      }
    });
  }

  onSaveEdit() {
    const data = this.formEditRef.formRef.getFieldsValue()
    console.log("TCL: Destination -> onSaveEdit -> data", data)
    const token = localStorage.getItem('jwt')
    const params = {
      headers: {
        jwt: token,
        'Content-Type': 'multipart/form-data'
      },

    }
    var formData = new FormData();
    const file = data.images.fileList
    console.log("TCL: Destination -> onSaveEdit -> file", file)
    file.map((x, index) => {
      if (index == file.length - 1) {
        formData.append('images', x.originFileObj)
      } else {
        formData.append('images', x)
      }
    })
    formData.append('destinationId', this.state.id)
    this.formEditRef.formRef.validateFields(async (err) => {
      if (!err) {
        await Axios.post('http://localhost:3000/v1/destination/update-image', formData, params).then((res) => {
          if (res.data.success) {
            this.loadData()
          }
        }).catch((err) => {
        })
        await Axios.put('http://localhost:3000/v1/destination/' + this.state.id, data, params)
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
        <Table bordered columns={this.columnDefs} dataSource={this.state.data} />
        <Modal
          visible={this.state.formCreate}
          title="Tạo mới địa điểm"
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
          title="Cập nhật địa điểm"
          width={700}
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
          title="Chi tiết địa điểm"
          width={700}
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
