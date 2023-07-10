"use client"
import type { AppliedUser } from '@prisma/client';
import { endpoints, userId } from '../../utils/endpoints';
import { Job } from '../../../src/app/api/utils/types';
import API from '../../../src/app/api/utils/api';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './styles.css';


type JobCardProps = {
    job: Job,
    appiedUsers?: AppliedUser[],
    admin?: boolean,
    showHandler?: () => void | undefined,
    setJobHandler?: (job: Job) => void | undefined,
    fetch?: () => void,
    prepareToast?: (msg: string, type: "success" | "danger" | "warning" | "dark") => void
}

const api = new API();



export default function JobCard(props: JobCardProps) {

    async function deleteJob(id: string) {
        try {
            const hostname = 'http://' + window.location.host;
            const response = await api.instance.delete(`${hostname}${endpoints.createJobs}/${id}`);
            if (response.status < 250) {
                props.prepareToast && props.prepareToast(`Deleted ${props.job.jobTitle}`, 'success')
                props.fetch && props.fetch()
            }
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    }

    const skills = props.job.jobSkills.map(jobS => jobS.skill.skillName);

    const openUpdater = () => {
        if (props.setJobHandler && props.showHandler && props.job) {
            props.setJobHandler(props.job)
            props.showHandler()
        }
    }

    const applyToJob = async () => {
        const hostname = 'http://' + window.location.host;
        const applicationObj = { jobId: props.job.id, userId: userId }
        const response = await api.instance.post(`${hostname}${endpoints.jobApplication}`, applicationObj);
    }

    const editTootip = (<Tooltip placement='top' >Edit Job</Tooltip>)
    const removeTootip = (<Tooltip placement='top' >Remove Job</Tooltip>)

    const Edit = () => {
        return (
            <OverlayTrigger placement="top" overlay={editTootip}>
                <img onClick={openUpdater} className='job-img' src="/edit.svg" />
            </OverlayTrigger>
        )
    }

    const Remove = () => {
        return (
            <OverlayTrigger placement="top" overlay={removeTootip}>
                <img
                    style={{ marginLeft: 'auto', marginTop: '0px', marginRight: '0px', width: '1.5rem', height: '1.5rem' }}
                    onClick={() => deleteJob(props.job.id)}
                    className='job-img'
                    src="/remove.svg" />
            </OverlayTrigger>
        )
    }

    const UserButton = () => {
        if (props.admin && props.job.appliedUsers?.length > 0) {
            return (
                <div className="job-card-apu-container">
                    <div style={{ fontWeight: 400, fontSize: '14px' }} >Applied user:</div>
                    <div style={{ color: '#0c6dfc' }} >{props.job.appliedUsers[0].user.fullName}</div>
                </div>
            )
        } else if (!props.admin && props.job.appliedUsers?.length === 0) {
            return (
                <div className='job-card-apu-container' >
                    <div></div>
                    <Button
                        onClick={applyToJob}
                        variant="primary"
                        style={{ float: 'left', marginRight: 'auto' }}
                    >Apply to Job</Button>
                </div>
            )
        } else if (!props.admin && props.job.appliedUsers?.length > 0) {
            return (
                <div className='job-card-apu-container' >
                    <div></div>
                    <div style={{ fontWeight: 400, fontSize: '14px', color: '#198754' }} >
                        Applied!
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    return (
        <div className="job-card">
            <div className="job-card-section">
                <h1 className='job-card-title'>{props.job?.jobTitle}</h1>
                {props.admin && <Edit />}
                {props.admin && <Remove />}
            </div>

            <div className="job-card-info-container" >
                <div className="job-card-description-section">
                    <label style={{ fontSize: '14px', marginBottom: '2px' }}>Description:</label>
                    <div className="description-container">{props.job.jobDescription}</div>
                </div>
                <div className='job-card-dscr-salary-container' >
                    <label style={{ fontSize: '90%', marginBottom: '2px', fontWeight: 600 }}>Salary Range</label>
                    <div className='job-card-section' >
                        <label style={{ fontSize: '90%', marginBottom: '2px', fontWeight: 400, marginRight: '3%' }}>${props.job.initialSalaryRange}</label>
                        <label style={{ fontSize: '90%', marginBottom: '2px', fontWeight: 400, marginRight: '3%' }}>-</label>
                        <label style={{ fontSize: '90%', marginBottom: '2px', fontWeight: 400 }}>${props.job.finalSalaryRange}</label>
                    </div>
                </div>
                <div className='job-card-dscr-salary-container' >
                    <label style={{ fontSize: '14px', marginBottom: '2px', fontWeight: 400 }}>Company Name</label>
                    <div className='job-card-section' >
                        <label style={{ fontSize: '14px', fontWeight: 100, marginBottom: '2px' }}>{props.job.companyName}</label>
                    </div>
                </div>
                <div className='job-card-dscr-salary-container'>
                    <label style={{ fontSize: '14px', marginBottom: '2px', fontWeight: 400 }}>Job location</label>
                    <div className='job-card-section' >
                        <label style={{ fontSize: '14px', fontWeight: 100, marginBottom: '2px' }}>{props.job.jobLocation}</label>
                    </div>
                </div>
            </div>

            <div className="job-card-skills-container" style={{ marginTop: '12px' }}>
                <div className='job-card-section' >
                    <strong style={{ fontSize: '14px', marginRight: '6px' }}>Skills:</strong>
                    {skills.map(skill => {
                        return (<div key={skill} className="job-skill-badge">{skill}</div>)
                    })}
                </div>
                <UserButton />
            </div>
        </div>
    );
}