"use client"
import './styles.css';
import type { Skill } from '@prisma/client'
import { useState } from 'react';
import { endpoints } from '../../utils/endpoints';
import Modal from 'react-bootstrap/Modal';
import JobCreateUpdateForm from '../JobCreateUpdateForm';
import API from '../../../src/app/api/utils/api';
import axios from 'axios';



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