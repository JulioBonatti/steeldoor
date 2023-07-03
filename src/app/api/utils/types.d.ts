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
    jobSkills: JobSkills[],
    appliedUsers: AppiedUser[]
}

export type AppiedUser = {
    id: string,
    jobId: string,
    userId: string,
    createdAt: Date,
    user: User
}

export type User = {
    id: string,
    emailAddress: string,
    fullName: string,
    password: string,
    userType: string,
    createdAt: Date,
    updatedAt: Date
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