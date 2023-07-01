const { Skill, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedSkills() {
  const skillsToSeed: typeof Skill[] = [
    { skillName: 'Python' },
    { skillName: 'Next' },
    { skillName: 'React' },
    { skillName: 'CSS' },
    { skillName: 'Html' },
    { skillName: 'Machine Learning' },
  ];

  try {
    for (const skill of skillsToSeed) {
      await prisma.skill.upsert({
        where: skill,
        update: {},
        create: skill
      });
      console.log(`Skill '${skill.skillName}' seeded successfully`);
    }
  } catch (error) {
    console.error('Error seeding skills:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSkills()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
