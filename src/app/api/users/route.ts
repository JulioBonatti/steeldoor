import { NextResponse } from 'next/server'
import prisma from '../utils/db';
import { User, UserKeys } from './user'

export async function GET(request: Request) {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs, { status: 200 });
}

export async function POST(request: Request) {
    try {
        const body: User = await request.json();
        // Validate the required properties in the request body
        const requiredFields: UserKeys = ['emailAddress', 'fullName', 'password', 'userType'];
        requiredFields.forEach(field => {
            if (!(field in body)) {
                throw new Error(`Missing required field: ${field}`);
            }
        })
        // Filter out unexpected properties from the request body
        const filteredReq: Partial<User> = Object.keys(body)
            .filter((key) => requiredFields.includes(key as keyof User))
            .reduce((obj, key) => {
                obj[key as keyof User] = body[key as keyof User];
                return obj;
            }, {} as Partial<User>);

        const user = await prisma.user.create({
            data: filteredReq as User,
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}