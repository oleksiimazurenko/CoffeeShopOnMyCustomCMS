'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const addPage = async (
	name: string,
	slug: string,
	type: string,
	textContentStructure: string = 'DEFAULT',
	productCardStructure: string = 'DEFAULT',
	
) => {
	const prisma = new PrismaClient()

	try {
		await prisma.page.create({
			data: {
				name,
				slug,
				type,
				textContentStructure,
				productCardStructure
			},
		})

		await prisma.$disconnect()

		console.log('Create page successful')
	} catch (error) {
		console.error('Error create page database:', error)
	}

	revalidatePath('/[pageSlug]', 'page')
	revalidatePath('/', 'layout')
}

export { addPage }