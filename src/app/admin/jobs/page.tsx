import type { Skill } from '@prisma/client'
import type { Job } from '../../api/utils/types'
import { endpoints } from '../../../../components/utils/endpoints';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import UserIndicator from '../../../../components/server/UserIndicator';
import AddJobButton from '../../../../components/client/AddJobModal';
import JobList from '../../../../components/client/JobList';
import API from '../../api/utils/api';
import './styles.css'


const api = new API();

async function fetchData() {
  const hostname: string | undefined = process.env.API_URL;
  const jobs: Job[] = (await api.instance.get(`${hostname}${endpoints.getJobs}`)).data;
  const skills: Skill[] = (await api.instance.get(`${hostname}${endpoints.getSkills}`)).data;
  return { jobs: jobs, skills: skills };
}

export default async function AdminDashboard() {
  const data = await fetchData();
  const jobs = data.jobs;
  const skills = data.skills;
  return (
    <main style={{ padding: '0px 20px', background: '#151515' }} >
      <BelowNavDivider />
      <JobList jobs={jobs} skills={skills} />
      <UserIndicator admin={true} />
      <AddJobButton skills={skills} />
    </main>
  )
}
