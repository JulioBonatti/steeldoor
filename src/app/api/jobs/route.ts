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
        const body: Job = await request.json();
        // Validate the required properties in the request body
        const requiredFields: JobKeys = [
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

        const job = await prisma.job.create({
            data: body as Job,
        });

        return NextResponse.json(job, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}