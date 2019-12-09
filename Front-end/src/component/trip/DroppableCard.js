import React, { Component } from 'react'
import CardSwap from './CardSwap_v2'
import styled from 'styled-components'
import './style.scss'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

export default class DroppableCard extends Component {
    render() {
        const { x, dragIndexParent } = this.props
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.id} type="TASK">
                    {(providedParent, snapshotParent) => (
                        <TaskList
                            ref={providedParent.innerRef}
                            {...providedParent.droppableProps}
                            isDraggingOver={snapshotParent.isDraggingOver}
                        >
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
                        </TaskList>
                    )}

                </Droppable>
            </Container>
        )
    }
}
