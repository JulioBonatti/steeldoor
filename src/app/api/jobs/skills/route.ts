import { NextResponse } from 'next/server'
import type { Skill } from '@prisma/client'
import prisma from '../../utils/db'


export async function GET() {
    const skills: Skill[] = await prisma.skill.findMany();
    const filteredSkills = skills.map(skill => { return {'id': skill.id, skillName: skill.skillName}})
    return NextResponse.json(filteredSkills, { status: 200 });
}
