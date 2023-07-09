import type { Skill } from '@prisma/client'
import type { Job } from '../../api/utils/types'
import { endpoints } from '../../../../components/utils/endpoints';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import AddJobButton from '../../../../components/client/AddJobModal';
import JobList from '../../../../components/client/JobList';
import API from '../../api/utils/api';
import SteelDoorNav from '../../../../components/server/SteelDoorNav';
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
    <main style={{ background: '#151515' }} >
      <SteelDoorNav admin={true} />
      <BelowNavDivider />
      <JobList jobs={jobs} skills={skills} admin={true} />
      <AddJobButton skills={skills} />
    </main>
  )
}
