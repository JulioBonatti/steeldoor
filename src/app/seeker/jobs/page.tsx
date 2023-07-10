"use client"
import { useState } from 'react';
import type { Job } from '../../api/utils/types';
import { endpoints } from '../../../../components/utils/endpoints';
import JobCard from '../../../../components/client/JobCard';
import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import ClientJobFilter from '../../../../components/client/ClientJobFilter';
import GeneralToast from '../../../../components/client/GeneralToast';
import SteelDoorNav from '../../../../components/server/SteelDoorNav';
import API from '../../api/utils/api';


const api = new API();


export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState([])

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('dark' as "success" | "danger" | "warning" | "dark");

  async function fetchData() {
    const hostname = 'http://' + window.location.host;
    const _jobs: Job[] = (await api.instance.get(`${hostname}${endpoints.getJobs}`)).data;
    setFilteredJobs(_jobs);
  }

  const prepareToast = (msg: string, type: "success" | "danger" | "warning" | "dark") => {
    setToastMessage(msg)
    setToastType(type)
    setShowToast(true)
  };

  return (
    <main >
      <SteelDoorNav admin={false} />
      <ClientJobFilter setFilteredJobs={setFilteredJobs} />
      <BelowNavDivider />
      <div style={{ paddingBottom: '4.2rem' }} className='page-container' >
        {filteredJobs.map((job: Job) => {
          return (
            <JobCard admin={false} key={`(${job.createdAt})`} job={job} fetch={fetchData} prepareToast={prepareToast} />
          )
        })
        }
      </div>
      <GeneralToast message={toastMessage} show={showToast} setShow={setShowToast} type={toastType} />
    </main>
  )
}
