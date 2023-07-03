export type Skill = {
    id: string,
    skillName: string,
    createdAt?: string,
}

export type JobSkills = {
    id: string,
    jobId: string,
    skillId: string,
    createdAt: string,
    skill: Skill
}

export type Job = {
    id: string,
    companyName: string,
    jobLocation: string,
    jobTitle: string,
    jobDescription: string,
    initialSalaryRange: number,
    finalSalaryRange: number,
    createdAt: string,
    updatedAt: string,
    jobSkills: JobSkills[]
}

type JobObj = {
    id?: string,
    companyName: string,
    jobLocation: string,
    jobTitle: string,
    jobDescription: string,
    initialSalaryRange: number,
    finalSalaryRange: number,
    skillIds: string[],
}

export interface JobPost {
    companyName: string,
    jobLocation: string,
    jobTitle: string,
    jobDescription: string,
    initialSalaryRange: number,
    finalSalaryRange: number,
    createdAt?: string,
    updatedAt?: string,
    skillIds: string[]
}

export interface JobPatch extends JobPost {
    id: string
}