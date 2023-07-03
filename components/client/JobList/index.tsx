"use client"
import './styles.css';
import type { Skill } from '@prisma/client'
import { useState } from 'react';
import type { Job } from '../../../src/app/api/utils/types';
import Modal from 'react-bootstrap/Modal';
import JobCreateUpdateForm from '../JobCreateUpdateForm';
import JobCard from '../JobCard';



type jobListProps = {
    skills: Skill[],
    jobs: Job[],
    admin?: boolean
}

export default function JobList(props: jobListProps) {

    const [show, setShow] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const EditModal = () => {
        if (props.admin) {
            return (
                <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Oportunity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <JobCreateUpdateForm skills={props.skills} closeHandler={handleClose} jobToEdit={jobToEdit} />
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
                        <JobCard showHandler={handleShow} admin={props.admin} key={`(${job.createdAt})`} job={job} setJobHandler={setJobToEdit} />
                    )
                })
                }
            </div>
            <button className="job-modal-button" onClick={handleShow}>
                +
            </button>
            <EditModal />
        </>
    );
}