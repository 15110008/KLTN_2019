import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    DragSource,
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,
} from 'react-dnd';
import flow from 'lodash/flow';
import { Card } from 'antd'

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = (findDOMNode(
            component,
        )).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
}

class CardSwap extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
            isBottomItem = false,
            stayTime,
            spotTime,
            length
        } = this.props;
        const opacity = isDragging ? 0 : 1;
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
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
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
                ),
            )
        );
    }
}

export default flow(
    DragSource(
        'cardSwap',
        cardSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    ),
    DropTarget('cardSwap', cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }))
)(CardSwap);