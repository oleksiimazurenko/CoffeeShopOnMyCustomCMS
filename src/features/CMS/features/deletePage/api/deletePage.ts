'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const deletePage = async (id: number) => {
	const prisma = new PrismaClient()
	const deletePage = await prisma.page.delete({
		where: {
			id: id,
		},
	})

	revalidatePath('/[pageSlug]', 'page')
	revalidatePath('/', 'layout')
}

export { deletePage }