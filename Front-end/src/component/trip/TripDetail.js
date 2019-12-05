import React, { Component } from 'react'
import Card from './Card'
import update from 'immutability-helper'
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { createBrowserHistory } from "history";
import axios from 'axios';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const history = createBrowserHistory()


const card = [
    {
        id: 1,
        text: 'Đà Lạt',
    },
    {
        id: 2,
        text: 'TP.HCM',
    },
    {
        id: 3,
        text: 'Vũng tàu',
    },
    {
        id: 4,
        text: 'Long An ',
    },
    {
        id: 5,
        text:
            'Há tiên',
    },
    {
        id: 6,
        text: '???',
    },
    {
        id: 7,
        text: 'PROFIT',
    },
]

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: card,
            data: []
        }
    }

    moveCard = (dragIndex, hoverIndex) => {
        console.log("TCL: Trip -> moveCard -> hoverIndex", hoverIndex)
        console.log("TCL: Trip -> moveCard -> dragIndex", dragIndex)
        const { data, allTrip } = this.state
        const dragCard = allTrip[dragIndex]
        this.setState(
            update(this.state, {
                allTrip: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )

    }

    // moveCard = (dragIndex, hoverIndex) => {
    //     const { card } = this.state
    //     const dragCard = card[dragIndex]

    //     this.setState(
    //         update(this.state, {
    //             card: {
    //                 $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
    //             },
    //         }),
    //     )
    // }

    componentDidMount() {
        const path = history.location.pathname
        const tripId = path.split('/')[2]
        this.loadData(tripId)
    }

    async loadData(id) {
        await axios({
            url: 'http://localhost:3000/v1/trip/' + id,
            method: 'get'
        })
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.meta
                    const allTrip = []
                    data.map(x => {
                        x.listPlaces.map(place => {
                            allTrip.push({
                                id: place.id, name: place.name
                            })
                        })
                    })
                    this.setState({
                        data: data,
                        allTrip: allTrip
                    })
                }
            }).catch((err) => {
                console.log("TCL: Card -> loadData -> err", err)
            })
    }


    render() {
        const { data } = this.state
        return (
            <div style={{ paddingTop: 100, paddingBottom: 50 }}>
                <div className='container'>
                    <DndProvider backend={HTML5Backend}>
                        <Tabs type="card">
                            {data.map((x, index) => {
                                console.log("TCL: Trip -> render -> data[index].name", data[index])
                                return <TabPane tab={`Ngày ${x.day} (${x.date})`} key="1">
                                    {data[0].listPlaces.map((place, index) => {
                                        return <Card
                                            key={place.id}
                                            index={index}
                                            id={place.id}
                                            text={place.name}
                                            moveCard={this.moveCard}
                                        />
                                    })}
                                </TabPane>
                            })}
                        </Tabs>
                        {/* <div >
                            {this.state.allTrip && this.state.allTrip.map((place, indexPlace) => {
                                return (
                                    <Card
                                        key={place.id}
                                        index={indexPlace}
                                        id={place.id}
                                        text={place.name}
                                        moveCard={this.moveCard}
                                    />
                                )
                            })}
                        </div> */}
                        {/* <div >
                            {data.map(x => {
                                return <div>
                                    {x.listPlaces.map((place, index) => {
                                        return <Card
                                            key={place.id}
                                            index={index}
                                            id={place.id}
                                            text={place.name}
                                            moveCard={this.moveCard}
                                        />
                                    })}
                                </div>
                            })}
                        </div> */}
                    </DndProvider>
                </div>
            </div>
        )
    }
}
