"use client"
import './styles.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import type { Skill } from '../../../src/app/api/utils/types';
import JobCreateUpdateForm from '../JobCreateUpdateForm';
import GeneralToast from '../GeneralToast';



type AddJobButtonProps = {
  skills: Skill[],
  fetch: () => void
}


export default function AddJobButton(props: AddJobButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('dark' as "success" | "danger" | "warning" | "dark");

  const prepareToast = (msg: string, type: "success" | "danger" | "warning" | "dark") => {
    setToastMessage(msg)
    setToastType(type)
    setShowToast(true)
  };

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); props.fetch(); }
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
          <JobCreateUpdateForm skills={props.skills} closeHandler={handleClose} prepareToast={prepareToast} />
        </Modal.Body>
      </Modal>
      <GeneralToast message={toastMessage} show={showToast} setShow={setShowToast} type={toastType} />
    </>
  );
}