import { NextRequest, NextResponse } from 'next/server'
import type { AppliedUser } from '@prisma/client'
import { AppliedUserKeys } from './application'
import prisma from '../../utils/db';


export async function POST(request: Request) {
    try {
        const applicationIds: AppliedUser = await request.json();
        
        const requiredFields: AppliedUserKeys = [
            'jobId',
            'userId',
        ];
        requiredFields.forEach(field => {
            if (!(field in applicationIds)) {
                throw new Error(`Missing required field: ${field}`);
            }
        })
        const appliedUser: AppliedUser = await prisma.appliedUser.create({
            data: applicationIds
        })
        return NextResponse.json(appliedUser, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}