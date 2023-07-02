import type { Job } from '@prisma/client'
import { endpoints } from '../../../../components/utils/endpoints';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import JobCard from '../../../../components/client/JobCard';
import API from '../../api/utils/api';

const api = new API();

async function fetchJobs(path: string) {
  const hostname: string | undefined = process.env.API_URL;
  const jobs: Job[] = (await api.instance.get(`${hostname}${path}`)).data;
  return jobs
}

export default async function AdminDashboard() {
  const { getJobs } = endpoints;
  const jobs = await fetchJobs(getJobs);
  return (
    <main style={{ padding: '0px 20px', background: '#151515' }} >
      <BelowNavDivider admin={true} />
      <div style={{ paddingBottom: '4.2rem' }}>
        {jobs.map(job => {
          return (
            <JobCard job={job} />
          )
        })
        }
        
      </div>
    </main>
  )
}
