///////////////////////////////////////////////////////////////////////////
//
// https://www.prisma.io/docs/guides/nextjs
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
//
// This latter approach is useful for Express apps when hot relaoding.
//
///////////////////////////////////////////////////////////////////////////

import { PrismaClient } from '@/generated/prisma'

type ExtendedPrismaClient = ReturnType<typeof createExtendedPrismaClient>

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL must be set.')
}

/* ========================================================================

======================================================================== */

const createExtendedPrismaClient = () => {
  return new PrismaClient({
    // See here at 3:30 : https://www.youtube.com/watch?v=Sdd1ScMHzrI
    // To get the password back you should be able to locally override:  select: { password: true }
    // omit: {
    //   user: { password: true }
    // }
  }).$extends({
    // How To Build a Prisma Client Extension: https://www.youtube.com/watch?v=j5LU6q38E-c
    // While using $allModels is a valid approach, the video points out at 4:00 that you're
    // sacrificing some type safety. When you use the generic $allModels approach, the runtime
    // transformation happens, but the TypeScript types remain based on the original Prisma schema.
    // ❌ model: { $allModels: {} },
    result: {
      user: {
        role: {
          compute(user) {
            return user.role.toString()
          }
        },
        ///////////////////////////////////////////////////////////////////////////
        //
        // Technically, you can pass a Date across the server/client boundary, and
        // it will automatically be seriaized into a string. Thus unlike Decimal, JSON knows how
        // to convert this value. However, it's still a good idea to explicitly tranform the value
        // here so that there is fidelity between the manually created Typescript types and the inferred type
        // from Prisma. The tradeoff is that if we ever need to use createdAt on the server, prior to
        // sending it to the client, we will need to remember that it's actually an ISO 8601 string.
        //
        ///////////////////////////////////////////////////////////////////////////
        createdAt: {
          compute(user) {
            return new Date(user.createdAt).toISOString()
          }
        },
        updatedAt: {
          compute(user) {
            return new Date(user.updatedAt).toISOString()
          }
        }
      },
      post: {
        createdAt: {
          compute(post) {
            return new Date(post.createdAt).toISOString()
          }
        },
        updatedAt: {
          compute(post) {
            return new Date(post.updatedAt).toISOString()
          }
        }
      }
    }
  })
}

/* ======================

====================== */

// ❌ const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient
}

// ❌ export const prisma = globalForPrisma.prisma || new PrismaClient()
export const prisma = globalForPrisma.prisma || createExtendedPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
