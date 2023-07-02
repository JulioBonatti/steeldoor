import { NextResponse } from 'next/server'
import type { Job } from '@prisma/client'
import prisma from '../../utils/db';


export async function DELETE(request: Request) {
    try {
        const id = request.url.slice(request.url.lastIndexOf('/') + 1);
        console.log('id: ', id)
        const job: Job | null = await prisma.job.findUnique({ where: { id: id } });
        if (!job) {
            throw new Error('Unable to find this job.');
        }

        const deleted = await prisma.job.delete({
            where: { id: job.id },
        })

        const jobTitle: string = job.jobTitle;
        return NextResponse.json({
            message: `deleted: ${jobTitle}`,
            deletedJob: deleted 
        }, { status: 202});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}