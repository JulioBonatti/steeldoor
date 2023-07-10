"use client"
import './styles.css'
import { useState, useEffect } from 'react';
import type { Skill } from '@prisma/client'
import type { Job } from '../../api/utils/types'
import { endpoints } from '../../../../components/utils/endpoints';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import AddJobButton from '../../../../components/client/AddJobModal';
import JobList from '../../../../components/client/JobList';
import SteelDoorNav from '../../../../components/server/SteelDoorNav';
import API from '../../api/utils/api';


const api = new API();

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);

  async function fetchData() {
    const hostname = 'http://' + window.location.host;
    const _jobs: Job[] = (await api.instance.get(`${hostname}${endpoints.getJobs}`)).data;
    const _skills: Skill[] = (await api.instance.get(`${hostname}${endpoints.getSkills}`)).data;
    setJobs(_jobs)
    setSkills(_skills)
  }

  useEffect(() => { fetchData() },[]);
  console.log(jobs)
  return (
    <main style={{ background: '#151515' }} >
      <SteelDoorNav admin={true} />
      <div className="pr-5 pl-5" >
        <BelowNavDivider />
      </div>
      {jobs && skills && <JobList jobs={jobs} skills={skills} admin={true} />}
      {jobs && skills && <AddJobButton skills={skills} fetch={fetchData} />}
    </main>
  )
}
