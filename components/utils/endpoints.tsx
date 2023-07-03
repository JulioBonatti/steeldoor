type Endpoints = {
    adminPage: string,
    seekerPage: string,
    getJobs: string,
    getJobsFiltered: string,
    createJobs: string,
    getSkills: string,
    jobApplication: string
}

export const endpoints: Endpoints  = {
    adminPage: '/admin/jobs',
    seekerPage: '/seeker/jobs',
    getJobs: '/api/jobs/',
    getJobsFiltered: '/api/jobs/filter',
    createJobs: '/api/jobs/',
    getSkills: '/api/jobs/skills/',
    jobApplication: '/api/jobs/application'
}

export const redirectToPath = (path: string | undefined) => {
    if (path) {
        const newPath = `${path}`;
        window.location.replace(newPath);
    }
};

// INFO: this is not supposed to work linke this, but since its a MVP...
export const userId: string = "4f20ae9b-aa0c-44b9-8d90-619181cd1a8d"