'use server'

import { prisma } from '@/lib/db/prisma'

/* ======================

====================== */

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()

    return {
      data: users,
      message: 'success',
      success: true
    }
  } catch (_err) {
    return {
      data: null,
      message: 'server error',
      success: false
    }
  }
}
