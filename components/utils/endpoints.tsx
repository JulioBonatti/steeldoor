type Endpoints = {
    adminPage: string,
    seekerPage: string,
    getJobs: string,
    getJobsFiltered: string,
    createJobs: string,
    getSkills: string
}

export const endpoints: Endpoints  = {
    adminPage: '/admin/jobs',
    seekerPage: '/seeker/jobs',
    getJobs: '/api/jobs/',
    getJobsFiltered: '/api/jobs/filter',
    createJobs: '/api/jobs/',
    getSkills: '/api/jobs/skills/'
}

export const redirectToPath = (path: string | undefined) => {
    if (path) {
        const newPath = `${path}`;
        window.location.replace(newPath);
    }
};