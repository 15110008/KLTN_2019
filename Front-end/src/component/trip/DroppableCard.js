import React, { Component } from 'react'
import CardSwap from './CardSwap_v2'
import styled from 'styled-components'
import './style.scss'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid #3897f1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: #3897f1
`

const TaskList = styled.div`
  padding: 8px;
  padding-bottom: 15px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

export default class DroppableCard extends Component {
    render() {
        const { x, getFieldDecorator, formItemLayout, dataRemain } = this.props
        if (!dataRemain) {
            return (
                <div className='col-md-4' style={{ padding: 'unset' }}>
                    <Container>
                        <Title>Ngày {x.day} ({x.date})</Title>
                        <Droppable droppableId={this.props.id} type="TASK">
                            {(providedParent, snapshotParent) => (
                                <TaskList
                                    ref={providedParent.innerRef}
                                    {...providedParent.droppableProps}
                                    isDraggingOver={snapshotParent.isDraggingOver}
                                >

                                    {x.listPlaces.map((place, index) => {
                                        // let _startTime = null
                                        // if (index != 0){
                                        //     _startTime = x.listSpot[index - 1].startTime
                                        // }
                                        if (index == x.listPlaces.length - 1) {
                                            return <CardSwap
                                                ref={c => this.cardSwapRef = c}
                                                key={place.id}
                                                index={index}
                                                id={place.id}
                                                getFieldDecorator={getFieldDecorator}
                                                formItemLayout={formItemLayout}
                                                indexParent={this.props.id}
                                                renderData={() => this.props.renderData()}
                                                listSpot={x.listSpot}
                                                image={place.image}
                                                startTime={x.listSpot[index] && x.listSpot[index].startTime}
                                                isBottomItem={true}
                                                text={place.name}
                                                moveCard={this.moveCard}
                                            />
                                        } else {
                                            return <CardSwap
                                                ref={c => this.cardSwapRef = c}
                                                key={place.id}
                                                index={index}
                                                id={place.id}
                                                listSpot={x.listSpot}
                                                renderData={() => this.props.renderData()}
                                                indexParent={this.props.id}
                                                image={place.image}
                                                getFieldDecorator={getFieldDecorator}
                                                formItemLayout={formItemLayout}
                                                stayTime={x.listSpot[index] && x.listSpot[index].stayTime}
                                                text={place.name}
                                                length={x.listSpot[index] && x.listSpot[index].length}
                                                spotTime={x.listSpot[index] && x.listSpot[index].spotTime}
                                                startTime={x.listSpot[index] && x.listSpot[index].startTime}
                                                moveCard={this.moveCard}
                                            />
                                        }
                                    })}
                                </TaskList>
                            )}

                        </Droppable>
                    </Container>
                </div>
            )
        } else {
            return <div className='col-md-12'>
                <Container>
                    <Title>Địa điểm khác</Title>
                    <Droppable droppableId={this.props.id} type="TASK">
                        {(providedParent, snapshotParent) => (
                            <TaskList
                                ref={providedParent.innerRef}
                                {...providedParent.droppableProps}
                                isDraggingOver={snapshotParent.isDraggingOver}
                            >
                                {x.listPlaces.map((place, index) => {
                                    return <CardSwap
                                        ref={c => this.cardSwapRef = c}
                                        dataRemain={true}
                                        key={place._id}
                                        index={index}
                                        id={place._id}
                                        indexParent={this.props.id}
                                        image={place.images && place.images[0]}
                                        text={place.name}
                                        moveCard={this.moveCard}
                                    />
                                })}
                            </TaskList>
                        )}

                    </Droppable>
                </Container>
            </div>
        }
    }
}
