import { NextResponse } from 'next/server'
import prisma from '../utils/db'
import { JobKeys } from './jobs'
import type { Job } from '@prisma/client'


export async function GET(request: Request) {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs, { status: 200 });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validate the required properties in the request body
        const requiredFields: string[] = [
            'companyName',
            'jobLocation',
            'jobTitle',
            'jobDescription',
            'initialSalaryRange',
            'finalSalaryRange',
            'skillIds'
        ];
        requiredFields.forEach(field => {
            if (!(field in body)) {
                throw new Error(`Missing required field: ${field}`);
            }
        })

        // Creates job and its relation to skills
        const { skillIds, ...jobData } = body;
        const job = await prisma.job.create({
            data: {
                ...jobData,
                jobSkills: {
                    create: skillIds.map((skillId: string) => ({
                        skill: { connect: { id: skillId } }
                    }))
                }
            },
            include: {
                jobSkills: true
            }
        });

        return NextResponse.json(job, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body: Job = await request.json();
        // Validate the required properties in the request body
        const requiredFields: JobKeys = [
            'id',
            'companyName',
            'jobLocation',
            'jobTitle',
            'jobDescription',
            'initialSalaryRange',
            'finalSalaryRange',
        ];
        requiredFields.forEach(field => {
            if (!(field in body)) {
                throw new Error(`Missing required field: ${field}`);
            }
        })

        const job = await prisma.job.update({
            where: { id: body.id },
            data: body,
        })

        return NextResponse.json(job, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}