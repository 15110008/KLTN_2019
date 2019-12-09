import React, { Component } from 'react'
import CardSwap from './CardSwap_v2'
import axios from 'axios';
import { Tabs, Card } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd'


const { TabPane } = Tabs;

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.id = this.props.match.params && this.props.match.params.id
    }

    onDragEnd = result => {
        const { destination, source, draggableId, dragIndex, dropIndex } = result
        console.log("TCL: Trip -> source", source)
        console.log("TCL: Trip -> draggableId", draggableId)
        console.log("TCL: Trip -> destination", destination)

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const { data, allTrip } = this.state
        const newDragIndex = source.index.split('_')
        const newHoverIndex = destination.index.split('_')
        const dragIndexParent = newDragIndex[0]
        const dragIndexChild = newDragIndex[1]
        const hoverIndexParent = newHoverIndex[0]
        const hoverIndexChild = newHoverIndex[1]
        // const dragCard = allTrip[dragIndex]

        const dragCard = data[dragIndexParent].listPlaces[dragIndexChild]
        console.log("TCL: Trip -> dragCard", dragCard)

        data[dragIndexParent].listPlaces.splice(dragIndexChild, 1)
        data[hoverIndexParent].listPlaces.splice(hoverIndexChild, 0, dragCard)

        this.setState({
            data: data
        })


        // Moving from one list to another

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
                    console.log("TCL: Trip -> loadData -> data", data)
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
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <div className='row' >
                                {data.map((x, dragIndexParent) => {
                                    return <div style={{ paddingTop: 30 }}>
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
                                                />
                                            }
                                        })}
                                    </div>
                                })}
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        )
    }
}
