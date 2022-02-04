import { PrismaClient } from '@prisma/client'
import prisma from '../prisma'

export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma: prisma,
}