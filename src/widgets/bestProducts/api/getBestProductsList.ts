'use server'

import { PrismaClient, bestProductItem } from '@prisma/client'


const getBestProductsList = async () => {

	const prisma = new PrismaClient()
	const data: bestProductItem[] = await prisma.bestProductItem.findMany()

	return data
}

export {getBestProductsList}