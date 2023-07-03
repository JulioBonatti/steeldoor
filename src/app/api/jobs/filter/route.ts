import { NextResponse, NextRequest } from 'next/server'
import type { Skill } from '@prisma/client'
import prisma from '../../utils/db'


async function getFilteredJobs(params) {
    const { companyName, finalSalaryRange, initialSalaryRange, jobLocation, skills } = params;

    const filter = {
        companyName,
        finalSalaryRange,
        initialSalaryRange,
        jobLocation,
        jobSkills: {
            some: {
                skill: {
                    skillName: { in: skills.map(skill => skill.skillName) },
                },
            },
        },
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
        console.error('Error retrieving filtered jobs:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: Request) {
    try {
        const body: JobPost = await request.json();
        console.log(body)       
        

        return NextResponse.json(job, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const possibleParams = ['companyName', 'finalSalaryRange', 'initialSalaryRange', 'jobLocation', 'skills']
    const params = {}
    possibleParams.forEach(param => {
        const p = searchParams.get(param)
        if (p != '' && p !== undefined) {
            params[param] = p
        }
    })
    console.log(params)
    try {
        // const filteredJobs = await getFilteredJobs(params);
        return NextResponse.json('', { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error retrieving filtered jobs' }, { status: 500 });
    }
}


