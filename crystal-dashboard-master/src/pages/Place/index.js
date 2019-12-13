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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Điểm đến',
      dataIndex: 'destinationId',
      key: 'destinationId',
      render: (text, record) => {
        if (this.state.destinationOption) {
          const destination = _.find(this.state.destinationOption, x => {
            return text == x.value
          })
          return destination && destination.label
        }
      }
    },
    {
      title: 'Loại hình du lịch',
      key: 'category',
      dataIndex: 'category',
      render: (text, record) => {
        if (this.optionCategory) {
          const category = _.find(this.optionCategory, x => {
            return text == x.value
          })
          return category && category.label
        }
      }
    },
    {
      title: 'Giá cả',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Mô tả',
      key: 'description',
      dataIndex: 'description',
      width: 400
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
    Axios.get('http://localhost:3000/v1/place')
      .then((response) => {
        if (response.data.success) {
          response.data.result.map((x, index) => {
            x.description = _.truncate(x.description, {
              'length': 500,
              'separator': /,? +/
            })
          })
          this.setState({
            data: response.data.result
          })

        } else {
        }
      }).catch(error => {
        console.log("TCL: Place -> loadData -> error", error)
      });
    Axios.get('http://localhost:3000/v1/destination')
      .then((res) => {
        const data = res.data.data
        const destinationOption = []
        data.map(x => {
          destinationOption.push({
            value: x._id,
            label: x.name
          })
        })

        this.setState({
          destinationOption: destinationOption
        })
      }).catch((error) => {

      })
  }

  onDelete(id) {
    const token = localStorage.getItem('jwt')
    const params = {
      headers: { jwt: token },
    }
    Axios.delete('http://localhost:3000/v1/place/' + id, params)
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

  onSaveEdit() {
    const data = this.formEditRef.formRef.getFieldsValue()

    const token = localStorage.getItem('jwt')
    const paramFile = {
      headers: {
        jwt: token,
        'Content-Type': 'multipart/form-data'
      },
    }
    const params = {
      headers: { jwt: token },
    }
    var formData = new FormData();
    const file = data.images.fileList
    file && file.map((x, index) => {
      if (x.originFileObj) {
        formData.append('images', x.originFileObj)
      } else {
        formData.append('images', x)
      }
    })
    formData.append('placeId', this.state.id)
    delete data.images
    this.formEditRef.formRef.validateFields(async (err) => {
      if (!err) {
        if (file) {
          await Axios.post('http://localhost:3000/v1/place/update-images', formData, paramFile).then(async (res) => {
            if (res.data.success) {
              await Axios.put('http://localhost:3000/v1/place/' + this.state.id, data, params)
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
          }).catch((err) => {
            notification['error']({
              message: "Lỗi! vui lòng thử lại",
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          })
        }
        else {
          await Axios.put('http://localhost:3000/v1/place/' + this.state.id, data, params)
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
