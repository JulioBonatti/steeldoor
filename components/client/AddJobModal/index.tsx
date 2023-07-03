"use client"
import './styles.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import type { Skill } from '../../../src/app/api/utils/types';
import JobCreateUpdateForm from '../JobCreateUpdateForm';


type AddJobButtonProps = {
  skills: Skill[],
}


export default function AddJobButton(props: AddJobButtonProps) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="job-modal-button" onClick={handleShow}>
        +
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" >
        <Modal.Header closeButton>
          <Modal.Title>Create Oportunity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobCreateUpdateForm skills={props.skills} closeHandler={handleClose} jobToEdit={false} />
        </Modal.Body>
      </Modal>
    </>
  );
}