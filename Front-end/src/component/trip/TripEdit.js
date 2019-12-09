import React, { Component } from 'react'
import CardSwap from './CardSwap'
import update from 'immutability-helper'
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import axios from 'axios';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.id = this.props.match.params && this.props.match.params.id
    }

    moveCard = (dragIndex, hoverIndex) => {
        console.log("TCL: Trip -> moveCard -> hoverIndex", hoverIndex)
        const { data, allTrip } = this.state
        const newDragIndex = dragIndex.split('_')
        const newHoverIndex = hoverIndex.split('_')
        const dragIndexParent = newDragIndex[0]
        const dragIndexChild = newDragIndex[1]
        const hoverIndexParent = newHoverIndex[0]
        const hoverIndexChild = newHoverIndex[1]
        // const dragCard = allTrip[dragIndex]

        const dragCard = data[dragIndexParent].listPlaces[dragIndexChild]

        data[dragIndexParent].listPlaces.splice(dragIndexChild, 1)
        data[hoverIndexParent].listPlaces.splice(hoverIndexChild, 0, dragCard)

        this.setState({
            data: data
        })

        let listPlaces = []
        const self = data[hoverIndexParent].listPlaces[parseInt(hoverIndexChild)]
        const prev = data[hoverIndexParent].listPlaces[parseInt(hoverIndexChild) - 1]
        const next = data[hoverIndexParent].listPlaces[parseInt(hoverIndexChild) + 1]

        if (hoverIndexChild == 0) {
            listPlaces.push({
                id: self.id,
                name: self.name
            })
            listPlaces.push({
                id: next.id,
                name: next.name
            })
        } else if (hoverIndexChild == data[hoverIndexParent].listPlaces.length) {
            listPlaces.push({
                id: self.id,
                name: self.name
            })
            listPlaces.push({
                id: prev.id,
                name: prev.name
            })
        } else {
            listPlaces.push({
                id: prev.id,
                name: prev.name
            })
            listPlaces.push({
                id: self.id,
                name: self.name
            })
            listPlaces.push({
                id: next.id,
                name: next.name
            })
        }
        const params = {
            listPlaces
        }
        axios.post('http://localhost:3000/v1/trip/Detail', params)
            .then((res) => {
                if (res.data.success) {

                }
            }).catch((err) => {
                console.log("TCL: Trip -> moveCard -> err", err)
            })
    }
    componentDidMount() {
        this.loadData(this.id)
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
            })
    }


    render() {
        const { data } = this.state
        return (
            <div style={{
                background: 'rgba(0, 0, 0, 0.02)'
            }}>
                <div style={{ paddingTop: 100, paddingBottom: 50 }}>
                    <div style={{ padding: `0px 50px` }}>
                        <DndProvider backend={HTML5Backend}>
                            <div className='row' >
                                {data.map((x, dragIndexParent) => {
                                    return <div className='col-md-4' style={{ paddingTop: 30 }}>
                                        <h3>Ngày {x.day} ({x.date})</h3>
                                        {x.listPlaces.map((place, index) => {
                                            if (index == x.listPlaces.length - 1) {
                                                return <CardSwap
                                                    key={place.id}
                                                    index={dragIndexParent + '_' + index}
                                                    id={place.id}
                                                    image={place.image}
                                                    isBottomItem={true}
                                                    text={place.name}
                                                    moveCard={this.moveCard}
                                                />
                                            } else {
                                                return <CardSwap
                                                    key={place.id}
                                                    index={dragIndexParent + '_' + index}
                                                    id={place.id}
                                                    image={place.image}
                                                    stayTime={x.listSpot[index] && x.listSpot[index].stayTime}
                                                    text={place.name}
                                                    length={x.listSpot[index] && x.listSpot[index].length}
                                                    spotTime={x.listSpot[index] && x.listSpot[index].spotTime}
                                                    moveCard={this.moveCard}
                                                />
                                            }
                                        })}
                                    </div>
                                })}
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </div>
        )
    }
}
