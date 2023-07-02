type Endpoints = {
    adminPage: string,
    seekerPage: string,
    getJobs: string
}

export const endpoints: Endpoints  = {
    adminPage: '/admin/jobs',
    seekerPage: '/seeker/jobs',
    getJobs: '/api/jobs/'
}

export const redirectToPath = (path: string | undefined) => {
    if (path) {
        const newPath = `${path}`;
        window.location.replace(newPath);
    }
};