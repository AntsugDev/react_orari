import { Modal, Button } from "react-bootstrap";
import React from "react";

export function MyModal({ title, testo, save,color, ...show }) {
    const hidden = save;
    const c =  color === undefined ? '#2ECC71' : '#E74C3C';

    return (
        <Modal {...show} backdrop="static"
            keyboard={false}>
            <Modal.Header style={{background:c}}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header >
            <Modal.Body>
                {testo}
            </Modal.Body>
            <Modal.Footer>
                <Button hidden={hidden} variant="primary" onClick={show.onHide}>Chiudi</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default MyModal;