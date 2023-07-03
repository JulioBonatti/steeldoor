"use client"
import { useState } from 'react';
import type { Job } from '../../api/utils/types';
import JobCard from '../../../../components/client/JobCard';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import UserIndicator from '../../../../components/server/UserIndicator';
import ClientJobFilter from '../../../../components/client/ClientJobFilter';


export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState([])
  console.log('filteredJobs @@@@@@@@@@', filteredJobs)
  return (
    <main >
      <ClientJobFilter setFilteredJobs={setFilteredJobs} />
      <BelowNavDivider style={{ paddingTop: '5px' }} />
      <div style={{ paddingBottom: '4.2rem' }} className='page-container' >
        {filteredJobs.map((job: Job) => {
          return (
            <JobCard admin={false} key={`(${job.createdAt})`} job={job} />
          )
        })
        }
      </div>
      <UserIndicator admin={true} />
    </main>
  )
}
