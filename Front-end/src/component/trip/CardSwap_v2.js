import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Card } from 'antd'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import './style.scss'

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

const Container = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props =>
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'white'
                : 'white'};
`

export default class CardSwap extends React.Component {
    // render() {
    //     const {
    //         text,
    //         isDragging,
    //         connectDragSource,
    //         connectDropTarget,
    //         isBottomItem = false,
    //         stayTime,
    //         spotTime,
    //         length
    //     } = this.props;
    //     const opacity = isDragging ? 0 : 1;
    //     let hoursStay = null
    //     let hoursSpot = null
    //     let minutesStay = null
    //     let minutesSpot = null
    //     if (stayTime) {
    //         hoursStay = Math.floor(stayTime / 60);
    //         minutesStay = stayTime % 60;
    //     }
    //     if (spotTime) {
    //         hoursSpot = Math.floor(spotTime / 60);
    //         minutesSpot = spotTime % 60;
    //     }
    //     return (
    //         connectDragSource &&
    //         connectDropTarget &&
    //         connectDragSource(
    //             connectDropTarget(
    //                 <div className='card-swap'>
    //                     <Card
    //                         style={{ height: 100 }}
    //                         extra={
    //                             <div>
    //                                 <div style={{ marginTop: -20, fontSize: 19, fontWeight: 'bold', paddingBottom: 5 }}>{text}</div>
    //                                 {!isBottomItem ? <span style={{ fontSize: 14, paddingTop: 10 }}>Thời gian lưu trú:
    //                         <span className='spot-time'>{hoursStay != 0 && (hoursStay + ' giờ ')}{minutesStay + " phút"}</span>
    //                                 </span> : ''}
    //                             </div>}
    //                         hoverable title={<img alt="example"
    //                             style={{ width: 100, height: 100 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} >

    //                     </Card>
    //                     {!isBottomItem ? <div className='to-next-item'>
    //                         <div className='travel-info'>
    //                             <img src={"../../images/car.svg"} />
    //                             <div>{length} km | {hoursSpot != 0 && (hoursSpot + ' giờ ')}{minutesSpot + " phút"}</div>
    //                         </div>
    //                     </div> : ''}
    //                 </div>
    //             ),
    //         )
    //     );
    // }

    render() {
        const {
            text,

            isBottomItem = false,
            stayTime,
            spotTime,
            length
        } = this.props;
        let hoursStay = null
        let hoursSpot = null
        let minutesStay = null
        let minutesSpot = null
        if (stayTime) {
            hoursStay = Math.floor(stayTime / 60);
            minutesStay = stayTime % 60;
        }
        if (spotTime) {
            hoursSpot = Math.floor(spotTime / 60);
            minutesSpot = spotTime % 60;
        }
        return (
            <Droppable droppableId={this.props.id} type="TASK">
                {(providedParent, snapshotParent) => (
                    <TaskList
                        ref={providedParent.innerRef}
                        {...providedParent.droppableProps}
                        isDraggingOver={snapshotParent.isDraggingOver}
                    >
                        {/* {this.props.tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder} */}
                        <Draggable
                            draggableId={this.props.id}
                            index={this.props.index}
                        >
                            {(provided, snapshot) => (
                                <Container
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    isDragging={snapshot.isDragging}
                                >
                                    <div className='card-swap'>
                                        <Card
                                            style={{ height: 100 }}
                                            extra={
                                                <div>
                                                    <div style={{ marginTop: -20, fontSize: 19, fontWeight: 'bold', paddingBottom: 5 }}>{text}</div>
                                                    {!isBottomItem ? <span style={{ fontSize: 14, paddingTop: 10 }}>Thời gian lưu trú:
                            <span className='spot-time'>{hoursStay != 0 && (hoursStay + ' giờ ')}{minutesStay + " phút"}</span>
                                                    </span> : ''}
                                                </div>}
                                            hoverable title={<img alt="example"
                                                style={{ width: 100, height: 100 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} >

                                        </Card>
                                        {!isBottomItem ? <div className='to-next-item'>
                                            <div className='travel-info'>
                                                <img src={"../../images/car.svg"} />
                                                <div>{length} km | {hoursSpot != 0 && (hoursSpot + ' giờ ')}{minutesSpot + " phút"}</div>
                                            </div>
                                        </div> : ''}
                                    </div>
                                </Container>
                            )}
                        </Draggable>
                    </TaskList>
                )}

            </Droppable>
        )
    }
}
