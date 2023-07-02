"use client"
import type { Job, JobSkill, AppliedUser } from '@prisma/client';
import Badge from 'react-bootstrap/Card';
import './styles.css';


type JobCardProps = {
    job?: Job,
    jobSkills?: JobSkill[],
    appiedUsers?: AppliedUser[]
}
export default function JobCard(props: JobCardProps) {

    const title = 'Job Title';
    const description = 'asdjasuhdiusadfhnasdiudfhas iudnasuiyhdioaushdiua yhsgddfiuoaSHDIU AShdo iuASHDUIOYAGHSdiuoyhAGHSDOIU YahsdoiuuHASDO IUAHsdoiuhASOIDUHasoiudhASKJ UIHYDGBiauysghdIAUSYG DOi uahyshdi uyAGS D U OHYagsdiuyBA SODIUYG H'
    const skils = ['Python', 'CSS', 'Html']
    return (
        <div className="job-card">
            <div className="job-card-section">
                <h1 className='job-card-title'>{props.job?.jobTitle}</h1>
                <div className="job-card-buttons-container"></div>
            </div>
            <div className="job-card-description-section">
                <label style={{fontSize: '14px', marginBottom: '2px'}}>Description:</label>
                <div className="description-container">{description}</div>
            </div>
            <div className="job-card-section" style={{marginTop: '12px'}}>
                <strong style={{fontSize: '14px', marginRight: '6px'}}>Skills</strong>
                {skils.map(skill => {
                    return (<div className="job-skill-badge">{skill}</div>)
                })}
            </div>
        </div>
    );
}