import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

export default class ModalCore extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Modal
                {...this.props}
                dialogClassName="modal-60w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.content}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}
