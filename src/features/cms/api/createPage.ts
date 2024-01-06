'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const createPage = async (
	name: string,
	slug: string,
	type: string,
	textContentStructure: string = 'DEFAULT',
	isDisabled: boolean = false,
	sectionBackgroundURL: string = ''
	
) => {
	const prisma = new PrismaClient()

	try {
		await prisma.page.create({
			data: {
				name,
				slug,
				type,
				textContentStructure,
				isDisabled,
				sectionBackgroundURL
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

export { createPage }