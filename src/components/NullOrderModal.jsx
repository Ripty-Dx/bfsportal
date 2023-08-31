import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const NullOrderModal = (props) => {
    return (
        <>
         <Modal
           {...props}
           size="md"
           aria-labelledby="contained-modal-title-vcenter"
           centered
         >
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-vcenter">
               No products were selected.
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <p>
              Please select products to proceed.
             </p>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={props.onHide}>OK</Button>
           </Modal.Footer>
         </Modal>
        </>
       );
}

export default NullOrderModal