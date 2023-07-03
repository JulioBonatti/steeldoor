const { Skill, PrismaClient, User } = require('@prisma/client');

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

async function seedUser() {
  const userToSeed = {
    id: "4f20ae9b-aa0c-44b9-8d90-619181cd1a8d",
    emailAddress: "seeker.job@gmail.com",
    fullName: "Job Seeker",
    password: "veryHardPwd",
    userType: "user"
  };

  try {
    await prisma.user.upsert({
      where: { id: userToSeed.id },
      update: {},
      create: userToSeed
    });
    console.log(`User '${userToSeed.fullName}' seeded successfully`);
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function runSeeds() {
  seedUser()
    .then(async () => {
      await seedSkills()
    }).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

runSeeds()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });