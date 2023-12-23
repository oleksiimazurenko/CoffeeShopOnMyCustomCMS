'use server'

import { PrismaClient, page } from '@prisma/client'

const getPages = async () => {

	const prisma = new PrismaClient()
	const pages: page[] = await prisma.page.findMany()

	return pages

}

export { getPages }