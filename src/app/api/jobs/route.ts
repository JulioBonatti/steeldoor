import { NextResponse } from 'next/server'
import prisma from '../utils/db'
import type { JobPost, JobPatch } from '../utils/types'

//ther should be athentication to determine which information would appear
export async function GET() {
  const jobs = await prisma.job.findMany({
    include: {
      jobSkills: {
        include: {
          skill: true,
        },
      },
      appliedUsers: {
        include: {
          user: true
        }
      },
    },
  });
  return NextResponse.json(jobs, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body: JobPost = await request.json();
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
    const body: JobPatch = await request.json();
    // Validate the required properties in the request body
    const requiredFields: string[] = [
      'id',
      'companyName',
      'jobLocation',
      'jobTitle',
      'jobDescription',
      'initialSalaryRange',
      'finalSalaryRange',
      'skillIds',
    ];
    requiredFields.forEach((field) => {
      if (!(field in body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    const { skillIds, ...jobData } = body;

    const job = await prisma.job.update({
      where: { id: body.id },
      data: jobData,
    });

    // Deleting JobSkill relation
    await prisma.jobSkill.deleteMany({
      where: { jobId: body.id },
    });

    //Updating jobskills relation
    const newJobSkills = skillIds.map((skillId) =>
      prisma.jobSkill.create({
        data: {
          jobId: body.id,
          skillId,
        },
      })
    );

    await prisma.$transaction(newJobSkills);

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

