import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const initialFilterState = {
    companyName: '',
    jobLocation: '',
    initialSalaryRange: '',
    finalSalaryRange: ''
}

const compareInitial = JSON.stringify(initialFilterState);
// TODO create a general response handler to avoid repated code
export async function POST(request: NextRequest) {
    const { jobFilter, skillsFilter } = await request.json();
    const jobFilterStr = JSON.stringify(jobFilter)
    if (skillsFilter.length === 0 && compareInitial === jobFilterStr) {
        const filteredJobs = await returnAllJobs()
        return NextResponse.json(filteredJobs, { status: 200 });
    } else { // if there is actually a real filter
        try {
            const jobIds = await getJobIdsWithSkills(skillsFilter);
            const filteredJobs = await filterJobs(jobIds, jobFilter);
            return NextResponse.json(filteredJobs, { status: 200 });
        } catch (error) {
            console.error('Error:', error);
            return NextResponse.json({ error: 'Error filtering jobs' }, { status: 500 });
        }
    }
}

async function returnAllJobs() {
    try {
        const filteredJobs = await prisma.job.findMany({
            include: {
                jobSkills: { include: { skill: true } },
                appliedUsers: true,
            },
        });
        return filteredJobs
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error filtering jobs' }, { status: 500 });
    }
}

async function getJobIdsWithSkills(skillsFilter) {
    const skillIds = skillsFilter.map(skill => skill.id);
    if (skillIds.length > 0) {
        try {
            const jobIds = await prisma.jobSkill.findMany({
                where: {
                    skillId: {
                        in: skillIds,
                    },
                },
                distinct: ['jobId'],
                select: {
                    jobId: true,
                },
            });
    
            return jobIds.map(job => job.jobId);
        } catch (error) {
            console.error('Error retrieving job IDs with skills:', error);
            throw error;
        }
    } else {
        const jobs = await returnAllJobs()
        return jobs.map(job => job.id);
    } 
}

async function filterJobs(jobIds, jobFilter) {
    const { companyName, finalSalaryRange, initialSalaryRange, jobLocation } = jobFilter;

    const filter = {
        id: {
            in: jobIds,
        },
        ...(companyName && { companyName: { contains: companyName } }),
        ...(initialSalaryRange && { initialSalaryRange: { gte: initialSalaryRange } }),
        ...(finalSalaryRange && { finalSalaryRange: { lte: finalSalaryRange } }),
        ...(jobLocation && { jobLocation: { contains: jobLocation } }),
    };

    try {
        const jobs = await prisma.job.findMany({
            where: filter,
            include: {
                jobSkills: {
                    include: { skill: true }
                },
                appliedUsers: true,
            },
        });

        return jobs;
    } catch (error) {
        console.error('Error filtering jobs:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
