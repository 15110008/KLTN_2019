import { Button, DatePicker, Form, notification, Select } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import Loading from '../base/Loading'
import './style.scss';


const { Option } = Select;
const cityOption = [
    {
        "value": "An Giang"
    },
    {
        "value": "Bà Rịa – Vũng Tàu"
    },
    {
        "value": "Bắc Giang"
    },
    {
        "value": "Bắc Kạn"
    },
    {
        "value": "Bạc Liêu"
    },
    {
        "value": "Bắc Ninh"
    },
    {
        "value": "Bến Tre"
    },
    {
        "value": "Bình Định"
    },
    {
        "value": "Bình Dương"
    },
    {
        "value": "Bình Phước"
    },
    {
        "value": "Bình Thuận"
    },
    {
        "value": "Cà Mau"
    },
    {
        "value": "Cần Thơ"
    },
    {
        "value": "Cao Bằng"
    },
    {
        "value": "Đà Nẵng"
    },
    {
        "value": "Đắk Lắk"
    },
    {
        "value": "Đắk Nông"
    },
    {
        "value": "Điện Biên"
    },
    {
        "value": "Đồng Nai"
    },
    {
        "value": "Đồng Tháp"
    },
    {
        "value": "Gia Lai"
    },
    {
        "value": "Hà Giang"
    },
    {
        "value": "Hà Nam"
    },
    {
        "value": "Hà Nội"
    },
    {
        "value": "Hà Tĩnh"
    },
    {
        "value": "Hải Dương"
    },
    {
        "value": "Hải Phòng"
    },
    {
        "value": "Hậu Giang"
    },
    {
        "value": "Hòa Bình"
    },
    {
        "value": "Hưng Yên"
    },
    {
        "value": "Khánh Hòa"
    },
    {
        "value": "Kiên Giang"
    },
    {
        "value": "Kon Tum"
    },
    {
        "value": "Lai Châu"
    },
    {
        "value": "Lâm Đồng"
    },
    {
        "value": "Lạng Sơn"
    },
    {
        "value": "Lào Cai"
    },
    {
        "value": "Long An"
    },
    {
        "value": "Nam Định"
    },
    {
        "value": "Nghệ An"
    },
    {
        "value": "Ninh Bình"
    },
    {
        "value": "Ninh Thuận"
    },
    {
        "value": "Phú Thọ"
    },
    {
        "value": "Phú Yên"
    },
    {
        "value": "Quảng Bình"
    },
    {
        "value": "Quảng Nam"
    },
    {
        "value": "Quảng Ngãi"
    },
    {
        "value": "Quảng Ninh"
    },
    {
        "value": "Quảng Trị"
    },
    {
        "value": "Sóc Trăng"
    },
    {
        "value": "Sơn La"
    },
    {
        "value": "Tây Ninh"
    },
    {
        "value": "Thái Bình"
    },
    {
        "value": "Thái Nguyên"
    },
    {
        "value": "Thanh Hóa"
    },
    {
        "value": "Thừa Thiên Huế"
    },
    {
        "value": "Tiền Giang"
    },
    {
        "value": "TP Hồ Chí Minh"
    },
    {
        "value": "Trà Vinh"
    },
    {
        "value": "Tuyên Quang"
    },
    {
        "value": "Vĩnh Long"
    },
    {
        "value": "Vĩnh Phúc"
    },
    {
        "value": "Yên Bái"
    },
]

const optionCategory = [
    { value: 1, label: 'Du lịch văn hóa' },
    { value: 3, label: 'Du lịch tham quan' }
]

export default class CreateTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            destinationOption: []
        }
    }

    renderForm() {
        return (
            <div>
                <CollectionCreateForm
                    ref={c => this.formRef = c}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    destinationOption={this.state.destinationOption}
                />
            </div>
        );
    }

    componentDidMount() {
        this.loadComboBox()
    }

    async loadComboBox() {
        await axios.get('http://localhost:3000/v1/destination')
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

    render() {
        return (
            <div style={{ paddingTop: 100 }} className='trip'>
                <div className='container create-trip'>
                    <div className="row block-9 justify-content-center mb-5">
                        <div className="col-md-9 mb-md-5">
                            <h2 style={{ marginLeft: 15 }}>Tạo lịch trình</h2>
                            <div >
                                {this.renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor() {
            super();
            this.state = {
                formLayout: 'vertical',
                startValue: null,
                endValue: null,
                endOpen: false,
                result: {},
                loading: false
            };
        }

        handleFormLayoutChange = e => {
            this.setState({ formLayout: e.target.value });
        };

        async onCreateTrip() {

            const data = this.props.form.getFieldsValue()
            const token = localStorage.getItem('jwt')
            if (token) {
                this.setState({
                    loading: true
                })
                const totalDate = await this.getDaysBetweenDates(data.dateFrom, data.dateTo)
                const arrayDate = await this.getDates(data.dateFrom, data.dateTo)
                const toDes = _.find(this.props.destinationOption, x => {
                    return x.value == data.placeTo
                })
                const params = {
                    totalDate: totalDate + 1,
                    destinationId: data.placeTo,
                    fromDes: data.placeFrom,
                    toDes: toDes.label,
                }
                console.log("TCL: extends -> onCreateTrip -> params", params)
                const header = {
                    headers: { jwt: token },
                }
                await axios.post('http://localhost:3000/v1/trip', params, header)
                    .then(async (response) => {
                        if (response.data.success) {
                            let oldList = []
                            let idx = 0;
                            while (idx < arrayDate.length) {
                                const param = {
                                    date: arrayDate[idx],
                                    day: idx + 1,
                                    oldList: oldList,
                                    hobbies: data.category,
                                    destinationId: data.placeTo,
                                    tripId: response.data.result._id,
                                    // tripId: "5de52e1343f50f406076539a",
                                }
                                await axios.post('http://localhost:3000/v1/tripDetail', param, header)
                                    .then((res) => {
                                        if (res.data.success) {
                                            res.data.result.listPlaces.map(x => {
                                                oldList.push({
                                                    id: x.id,
                                                    name: x.name
                                                })
                                            })
                                            if (idx == arrayDate.length - 1) {
                                                window.location.replace("http://localhost:3006/trip-detail-self/" + response.data.result._id)
                                            }
                                        }
                                    }).catch((error) => {
                                        console.log("TCL: extends -> onCreateTrip -> error", error)
                                        notification['error']({
                                            message: 'Lỗi kết nối server, Vui lòng thử lại sau !!!',
                                            onClick: () => {
                                                console.log('Notification Clicked!');
                                            },
                                        });
                                    })
                                idx++;
                            }
                        }
                    }).catch((err) => {
                        console.log("TCL: extends -> onCreateTrip -> err", err)
                        notification['error']({
                            message: 'Lỗi kết nối server, Vui lòng thử lại sau !!!',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }).finally(() => {
                        this.setState({
                            loading: false
                        })
                    })
            } else {
                notification['warning']({
                    message: 'Bạn phải đăng nhập trước',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }

        }

        arr_diff(a1, a2) {

            var a = [], diff = [];

            for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
            }

            for (var i = 0; i < a2.length; i++) {
                if (a[a2[i]]) {
                    delete a[a2[i]];
                } else {
                    a[a2[i]] = true;
                }
            }

            for (var k in a) {
                diff.push(k);
            }

            return diff;
        }

        getDaysBetweenDates(d0, d1) {

            var msPerDay = 8.64e7;

            // Copy dates so don't mess them up
            var x0 = new Date(d0);
            var x1 = new Date(d1);

            // Set to noon - avoid DST errors
            x0.setHours(12, 0, 0);
            x1.setHours(12, 0, 0);

            // Round to remove daylight saving errors
            return Math.round((x1 - x0) / msPerDay);
        }

        getDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('MM-DD-YYYY'))
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        }

        disabledStartDate = startValue => {
            const { endValue } = this.state;
            const data = this.props.form.getFieldsValue()
            const permitedDate = moment(data.dateTo).subtract(5, 'days')
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() < permitedDate.valueOf();
        };

        disabledEndDate = endValue => {
            const { startValue } = this.state;
            const data = this.props.form.getFieldsValue()
            const permitedDate = moment(data.dateFrom).add(5, 'days')
            if (!endValue || !startValue) {
                return false;
            }

            return endValue.valueOf() > permitedDate.valueOf();

        };

        onChange = (field, value) => {
            this.setState({
                [field]: value,
            });
        };

        onStartChange = value => {
            this.onChange('startValue', value);
        };

        onEndChange = value => {
            this.onChange('endValue', value);
        };

        render() {
            const { formLayout } = this.state;
            const formItemLayout =
                formLayout === 'horizontal'
                    ? {
                        labelCol: { span: 4 },
                        wrapperCol: { span: 14 },
                    }
                    : null;
            const buttonItemLayout =
                formLayout === 'horizontal'
                    ? {
                        wrapperCol: { span: 14, offset: 4 },
                    }
                    : null;

            const { visible, onCancel, onCreate, form } = this.props;

            const { getFieldDecorator } = form;
            const { endOpen, startValue, endValue } = this.state;
            console.log("TCL: extends -> render -> this.state.loading", this.state.loading)
            return (this.state.loading ?
                <Loading /> :
                <div>
                    <Form layout={formLayout}>
                        <div className='row'>
                            <div className='col-md-4'>
                                <Form.Item label="Điểm xuất phát">
                                    {getFieldDecorator('placeFrom', {
                                    })(<Select placeholder="Chọn điểm đi" readOnly={this.props.readOnly}>
                                        {cityOption.map((x, index) => {
                                            return <Option key={index} value={x.value}>{x.value}</Option>
                                        })}
                                    </Select>)}
                                </Form.Item>
                            </div>
                            <div className='col-md-4'>
                                <Form.Item label="Điểm đến">
                                    {getFieldDecorator('placeTo', {
                                        rules: [{ required: true, message: 'Bạn phải chọn điểm đến' }],
                                    })(<Select placeholder="Chọn điểm đến" readOnly={this.props.readOnly} >
                                        {this.props.destinationOption && this.props.destinationOption.map((x, index) => {
                                            return <Option key={index} value={x.value}>{x.label}</Option>
                                        })}
                                    </Select>)}
                                </Form.Item>
                            </div>
                            <div className='col-md-4'>
                                <Form.Item label="Loại hình du lịch">
                                    {getFieldDecorator('category')
                                        (<Select placeholder="Chọn điểm đến" readOnly={this.props.readOnly} >
                                            {optionCategory.map((x, index) => {
                                                return <Option key={index} value={x.value}>{x.label}</Option>
                                            })}
                                        </Select>)}
                                </Form.Item>
                            </div>
                            <div className='col-md-6'>
                                <Form.Item label="Ngày đi">
                                    {getFieldDecorator('dateFrom')(
                                        <DatePicker
                                            disabledDate={this.disabledStartDate}
                                            style={{ width: '100%' }}
                                            placeholder="Chọn ngày đi"
                                            value={startValue}
                                            onChange={this.onStartChange}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <div className='col-md-6'>
                                <Form.Item label="Ngày về">
                                    {getFieldDecorator('dateTo')
                                        (
                                            <DatePicker
                                                disabledDate={this.disabledEndDate}
                                                style={{ width: '100%' }}
                                                placeholder="Chọn ngày về"
                                                value={endValue}
                                                onChange={this.onEndChange}
                                                onOpenChange={this.handleEndOpenChange}
                                            />
                                        )}
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={() => this.onCreateTrip()}>Tạo lịch trình</Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    }
)