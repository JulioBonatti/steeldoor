"use client"
import type { AppliedUser } from '@prisma/client';
import { endpoints } from '../../utils/endpoints';
import { Job } from '../../../src/app/api/utils/types';
import API from '../../../src/app/api/utils/api';
import './styles.css';


type JobCardProps = {
    job: Job,
    showHandler: () => void,
    appiedUsers?: AppliedUser[],
    admin?: boolean,
    setJobHandler: any
}

const api = new API();

async function deleteJob(id: string) {
    try {
        const hostname = 'http://' + window.location.host;
        const response = await api.instance.delete(`${hostname}${endpoints.createJobs}/${id}`);
        window.location.reload();
        // TODO: toast to indicate deletion
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
}


export default function JobCard(props: JobCardProps) {

    const skills = props.job.jobSkills.map(jobS => jobS.skill.skillName);

    const openUpdater = () => {
        props.setJobHandler(props.job)
        props.showHandler()
    }

    const AdminButtons = () => {
        if (props.admin) {
            return (
                <>
                    <label onClick={openUpdater} className='job-label' >Edit</label>
                    <label onClick={() => deleteJob(props.job.id)} style={{ marginLeft: '0px' }} className='job-label' >Remove</label>
                </>
            )
        } else {
            return (<></>)
        }
    }

    return (
        <div className="job-card">
            <div className="job-card-section">
                <h1 className='job-card-title'>{props.job?.jobTitle}</h1>
                <div className="job-card-buttons-container"></div>
                <AdminButtons />
            </div>
            <div className="job-card-section" >
                <div className="job-card-description-section">
                    <label style={{ fontSize: '14px', marginBottom: '2px' }}>Description:</label>
                    <div className="description-container">{props.job.jobDescription}</div>
                </div>
                <div className='job-card-dscr-salary-container' >
                    <label style={{ fontSize: '20px', marginBottom: '2px', fontWeight: 600 }}>Salary Range</label>
                    <div className='job-card-section' >
                        <label style={{ fontSize: '20px', marginBottom: '2px', fontWeight: 400, marginRight: '1rem' }}>{props.job.initialSalaryRange}</label>
                        <label style={{ fontSize: '20px', marginBottom: '2px', fontWeight: 400, marginRight: '1rem' }}>-</label>
                        <label style={{ fontSize: '20px', marginBottom: '2px', fontWeight: 400 }}>{props.job.finalSalaryRange}</label>
                    </div>
                </div>
                <div className='job-card-section' style={{ marginTop: '3px', marginLeft: 'auto' }}>
                    <div className='job-card-dscr-salary-container' style={{ marginLeft: '10px' }} >
                        <label style={{ fontSize: '14px', marginBottom: '2px', fontWeight: 400 }}>Company Name</label>
                        <div className='job-card-section' >
                            <label style={{ fontSize: '14px', fontWeight: 100, marginBottom: '2px', marginRight: '1rem' }}>{props.job.companyName}</label>
                        </div>
                    </div>
                    <div className='job-card-dscr-salary-container' style={{ marginLeft: '10px' }}>
                        <label style={{ fontSize: '14px', marginBottom: '2px', fontWeight: 400 }}>Job location</label>
                        <div className='job-card-section' >
                            <label style={{ fontSize: '14px', fontWeight: 100, marginBottom: '2px', marginRight: '1rem' }}>{props.job.jobLocation}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="job-card-section" style={{ marginTop: '12px' }}>
                <strong style={{ fontSize: '14px', marginRight: '6px' }}>Skills</strong>
                {skills.map(skill => {
                    return (<div key={skill} className="job-skill-badge">{skill}</div>)
                })}
            </div>
        </div>
    );
}