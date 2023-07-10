import { stderr } from 'process';
import type { Job, JobObj, Skill, JobSkills } from '../../../src/app/api/utils/types';

type StrKeys = "jobTitle" | "companyName" | "jobLocation" | "skillIds"
const strKeys: StrKeys[] = [
    "jobTitle",
    "companyName",
    "jobLocation",
    "skillIds"
]

const messages = {
    jobTitle: 'Job title field.',
    companyName: 'Company name field.',
    jobLocation: 'Job location field.',
    skillIds: 'Choose skills'
}

type ToastTypes = "success" | "danger" | "warning" | "dark"

const tTypes: ToastTypes[] = ["success", "danger", "warning", "dark"]

type Validate = (obj: JobObj) => { valid: boolean, msg: string, tType: ToastTypes }
// form validation
export const validate: Validate = (obj: JobObj) => {
    let valid = false
    let msg = ''
    let tType = tTypes[2]

    for (const key of strKeys) {
        if (obj[key] === "") {
            msg = `Complete ${messages[key]}`
            tType = 'warning'
            valid = false
            return {valid, msg, tType}
        }
    }
    if (obj.skillIds.length === 0) {
        return {
            valid,
            msg: 'Please, choose skills',
            tType
        }
    }
    if (obj.initialSalaryRange < 0) {
        return {
            valid,
            msg: 'Value must be positive',
            tType
        }
    }
    if (obj.finalSalaryRange < 0) {
        return {
            valid,
            msg: 'Value must be positive',
            tType
        }
    }
    if (obj.initialSalaryRange > obj.finalSalaryRange) {
        return {
            valid: false,
            msg: 'Initial must be lower than final range',
            tType
        }
    }
    return {
        valid: true,
        msg: `Created Job: ${obj.jobTitle}`,
        tType: tTypes[0]
    }
}