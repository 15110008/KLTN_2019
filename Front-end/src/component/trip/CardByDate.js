import React, { Component } from 'react'
import Card from './Card'
import update from 'immutability-helper'
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            listPlaces: this.props.data.listPlaces
        }
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { listPlaces } = this.state
        const dragCard = listPlaces[dragIndex]
        this.setState(
            update(this.state, {
                listPlaces: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )

    }


    render() {
        const { data, listPlaces } = this.state
        console.log("TCL: Trip -> render -> data", data)
        console.log("TCL: Trip -> render -> listPlaces", listPlaces)
        return (
            <div>
                {listPlaces && listPlaces.map((place, index) => {
                    return <DndProvider backend={HTML5Backend}>
                        <Card
                            key={place.id}
                            index={index}
                            id={place.id}
                            text={place.name}
                            moveCard={this.moveCard}
                        />
                    </DndProvider>
                })}
            </div>
        )
    }
}
