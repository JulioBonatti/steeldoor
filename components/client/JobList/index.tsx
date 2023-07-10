"use client"
import './styles.css';
import { useState } from 'react';
import type { Job, Skill } from '../../../src/app/api/utils/types';
import Modal from 'react-bootstrap/Modal';
import JobCreateUpdateForm from '../JobCreateUpdateForm';
import JobCard from '../JobCard';
import GeneralToast from '../GeneralToast';


type jobListProps = {
    skills: Skill[],
    jobs: Job[],
    admin?: boolean,
    fetch: () => void
}

export default function JobList(props: jobListProps) {

    const [showModal, setShowModal] = useState(false); // Modal

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('dark' as "success" | "danger" | "warning" | "dark");

    const [jobToEdit, setJobToEdit] = useState({} as Job | {})
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const prepareToast = (msg: string, type: "success" | "danger" | "warning" | "dark") => {
        setToastMessage(msg)
        setToastType(type)
        setShowToast(true)
    };

    const EditModal = () => {
        if (props.admin) {
            return (
                <Modal show={showModal} onHide={handleClose} dialogClassName="modal-90w" >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Oportunity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <JobCreateUpdateForm prepareToast={prepareToast} skills={props.skills} closeHandler={handleClose} jobToEdit={jobToEdit} fetch={props.fetch} />
                    </Modal.Body>
                </Modal>
            )
        } else { return null }
    }

    return (
        <>
            <div style={{ paddingBottom: '4.2rem' }} className='page-container' >
                {props.jobs.map(job => {
                    return (
                        <JobCard
                            showHandler={handleShow}
                            admin={props.admin}
                            key={`(${job.createdAt})`}
                            job={job}
                            setJobHandler={setJobToEdit}
                            fetch={props.fetch}
                            prepareToast={prepareToast}
                        />
                    )
                })
                }
            </div>
            <button className="job-modal-button" onClick={handleShow}>
                +
            </button>
            <EditModal />
            <GeneralToast message={toastMessage} show={showToast} setShow={setShowToast} type={toastType} />
        </>
    );
}