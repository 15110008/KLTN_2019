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
                size="lg"
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
                    <Button onClick={this.props.onClick}>Close</Button>
                    <Button onClick={this.props.onClick}>Login</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    // render() {
    //     const [modalShow, setModalShow] = React.useState(false);

    //     return (
    //         <ButtonToolbar>
    //             <Button variant="primary" onClick={() => setModalShow(true)}>
    //                 Launch vertically centered modal
    //         </Button>

    //             <MyVerticallyCenteredModal
    //                 show={modalShow}
    //                 onHide={() => setModalShow(false)}
    //             />
    //         </ButtonToolbar>
    //     );
    // }
}
