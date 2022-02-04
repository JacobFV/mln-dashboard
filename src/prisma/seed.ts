import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    emails: {
      create: [
        {
          email: 'anonymous@mln-dashboard.com',
          needsVerification: false,
          primary: true,
        }
      ],
    },
    loginAttempts: {
      create: [ ],
    },
    ownerOfGroups: {
      create: [ ],
    },
    explicitPermissionsAdded: {
      create: [ ],
    },
    entityRef: {
      create: {
        name: 'Anonymous',
        picture: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        groupMemberships: {
          create: [ ],
        },
        explicitlyGrantedPermissions: {
          create: [ ],
        },
      },
    },
  },
  {
    emails: {
      create: [
        {
          email: 'system@mln-dashboard.com',
          needsVerification: false,
          primary: true,
        }
      ],
    },
    loginAttempts: {
      create: [ ],
    },
    ownerOfGroups: {
      create: [ ],
    },
    explicitPermissionsAdded: {
      create: [ ],
    },
    entityRef: {
      create: {
        name: 'System',
        picture: 'https://www.gravatar.com/avatar/',
        groupMemberships: {
          create: [ ],
        },
        explicitlyGrantedPermissions: {
          create: [ ],
        },
      },
    },
  },
  {
    emails: {
      create: [
        {
          email: 'jacobfv123@gmail.com',
          needsVerification: false,
          primary: true,
        }
      ],
    },
    loginAttempts: {
      create: [ ],
    },
    ownerOfGroups: {
      create: [ ],
    },
    explicitPermissionsAdded: {
      create: [ ],
    },
    entityRef: {
      create: {
        name: 'Jacob',
        picture: 'https://avatars.githubusercontent.com/u/40343913?s=96&v=4',
        groupMemberships: {
          create: [ ],
        },
        explicitlyGrantedPermissions: {
          create: [ ],
        },
      },
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })