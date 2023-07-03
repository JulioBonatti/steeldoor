import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { jobFilter, skillsFilter } = await request.json();
    try {
        const jobIds = await getJobIdsWithSkills(skillsFilter);
        const filteredJobs = await filterJobs(jobIds, jobFilter);

        return NextResponse.json(filteredJobs, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error filtering jobs' }, { status: 500 });
    }
}

async function getJobIdsWithSkills(skillsFilter) {
    const skillIds = skillsFilter.map(skill => skill.id);

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
}

async function filterJobs(jobIds, jobFilter) {
    const { companyName, finalSalaryRange, initialSalaryRange, jobLocation } = jobFilter;

    const filter = {
        id: {
            in: jobIds,
        },
        ...(companyName && { companyName }),
        ...(finalSalaryRange && { finalSalaryRange }),
        ...(initialSalaryRange && { initialSalaryRange }),
        ...(jobLocation && { jobLocation }),
    };

    try {
        const jobs = await prisma.job.findMany({
            where: filter,
            include: {
                jobSkills: true,
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
