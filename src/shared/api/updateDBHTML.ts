'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const updateDBHTML = async (id: number, content: string) => {
	const prisma = new PrismaClient()

	try {
		await prisma.page.update({
			where: { id: id },
			data: { textContentStructure: content },
		})

		await prisma.$disconnect()

		console.log('Update successful')
	} catch (error) {
		console.error('Error updating database:', error)
	}

}

export { updateDBHTML }