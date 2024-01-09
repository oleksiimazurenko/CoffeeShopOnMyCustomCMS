'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

const uploadImage = async (data: FormData, pathName: string) => {
	
	const file: File | null = data.get('file') as unknown as File
	if (!file) {
		throw new Error('No file uploaded')
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)

	
	const path = join(process.cwd(), pathName, file.name)
	await writeFile(path, buffer)
	console.log(`open ${path} to see the uploaded file`)

	return { success: true }
}

export { uploadImage }