'use server'

import { PrismaClient } from '@prisma/client'

const updateTextContent = async (slug: string, content: string) => {
	const prisma = new PrismaClient()

	try {
		await prisma.page.update({
			where: { slug: slug },
			data: { textContentStructure: content },
		})

		await prisma.$disconnect()

	} catch (error) {
		console.error('Error updating database:', error)
	}
}

export { updateTextContent }