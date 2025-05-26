'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

import { serializeData } from '@/utils'
import { ResponsePromise, User } from '@/types'

type Data = User | null
export type GetCurrentUserResponsePromise = ResponsePromise<Data>
export type GetCurrentUser = () => GetCurrentUserResponsePromise
export type GetCurrentUserResolvedResponse =
  Awaited<GetCurrentUserResponsePromise>

/* ======================

====================== */

export async function getCurrentUser() {
  const session = await auth() // Session | null

  if (!session || !session.user || !session.user.id) {
    return {
      code: 'UNAUTHORIZED',
      data: null,
      message: 'Unauthorized. User must be authenticated.',
      success: false
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
      ///////////////////////////////////////////////////////////////////////////
      //
      // Rather than using `omit: { password: true }` locally, we can use the global
      // omit when instantiating the PrismaClient. This is done in src/lib/db/prisma.ts:
      //
      //   omit: { user: { password: true } }
      //
      ///////////////////////////////////////////////////////////////////////////

      // ❌ omit: { password: true }
    })

    if (!user) {
      return {
        code: 'NOT_FOUND',
        data: null,
        message: 'Resource not found.',
        success: false
      }
    }

    // This is essentially not needed, since the where clause in the
    // initial query ensures that the user is the one that was found.
    if (session.user.id !== user.id) {
      return {
        code: 'FORBIDDEN',
        data: null,
        message: 'Forbidden. User does not have access to this resource.',
        success: false
      }
    }

    const serializedUser = serializeData(user)

    return {
      code: 'OK',
      data: serializedUser,
      message: 'success',
      success: true
    }
  } catch (_err) {
    return {
      code: 'INTERNAL_SERVER_ERROR',
      data: null,
      message: 'server error',
      success: false
    }
  }
}
