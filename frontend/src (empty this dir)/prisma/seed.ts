//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const entityData = [
  {
    name: "Anonymous",
    picture: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    memberOfGroups: { },
    permissionsAssignedToMe: { },
    emails: {
      create: [
        {
          email: "anonymous@mln-dashboard.com",
          needsVerification: false,
          primary: true,
        },
      ],
    },
    loginAttempts: { },
    ownerOfGroups: { },
    explicitPermissionsCreated: { },
    groupMembershipRelations: { }
  },
  {
    name: "System",
    picture: "https://www.gravatar.com/avatar/",
    memberOfGroups: { },
    permissionsAssignedToMe: { },
    emails: {
      create: [
        {
          email: "system@mln-dashboard.com",
          needsVerification: false,
          primary: true,
        },
      ],
    },
    loginAttempts: { },
    ownerOfGroups: { },
    explicitPermissionsCreated: { },
    groupMembershipRelations: { }
  },
  /* {
    name: "Jacob",
    picture: "https://avatars.githubusercontent.com/u/40343913?s=96&v=4",
    memberOfGroups: { },
    permissionsAssignedToMe: { },
    emails: {
      create: [
        {
          email: "jacobfv@msn.com",
          primary: true,
        },
      ],
    },
    loginAttempts: { },
    ownerOfGroups: { },
    explicitPermissionsCreated: { },
    groupMembershipRelations: { }
  } */
];

async function main() {
  console.log(`Start seeding ...`);
  for (const entity of entityData) {
    console.log(`Seeding entity: ${entity.name}`);
    await prisma.entity.create({ data: entity });
    console.log(`Created entity: ${entity.name}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
