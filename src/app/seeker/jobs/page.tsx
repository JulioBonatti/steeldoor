"use client"
import { useState } from 'react';
import type { Job } from '../../api/utils/types';
import JobCard from '../../../../components/client/JobCard';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import ClientJobFilter from '../../../../components/client/ClientJobFilter';
import SteelDoorNav from '../../../../components/server/SteelDoorNav';


export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState([])
  return (
    <main >
      <SteelDoorNav admin={false} />
      <ClientJobFilter setFilteredJobs={setFilteredJobs} />
      <BelowNavDivider />
      <div style={{ paddingBottom: '4.2rem' }} className='page-container' >
        {filteredJobs.map((job: Job) => {
          return (
            <JobCard admin={false} key={`(${job.createdAt})`} job={job} />
          )
        })
        }
      </div>
    </main>
  )
}
