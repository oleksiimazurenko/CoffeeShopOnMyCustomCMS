'use client'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/shared/ui/form'

import { uploadImage } from '@/shared/api/uploadImage'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { Image, ImagePlus } from 'lucide-react'
import { useState } from 'react'
// import { uploadFile } from '@/shared/api/uploadFile'

//---------------------------------------------------------------
// Инициализация схемы валидации
//---------------------------------------------------------------
const formSchema = z.object({
	file: z.unknown().refine(
		file => {
			if (!(file instanceof File)) {
				return false
			}

			const validTypes = ['image/jpeg', 'image/png', 'image/gif']
			return validTypes.includes(file.type)
		},
		{
			message: 'file not selected',
		}
	),
})

//---------------------------------------------------------------
// Функция для получения текста ошибки
//---------------------------------------------------------------
const getErrorMessage = (error: unknown): string => {
	let message: string

	if (error instanceof Error) {
		message = error.message
	} else if (error && typeof error === 'object' && 'message' in error) {
		message = String(error.message)
	} else if (typeof error === 'string') {
		message = error
	} else {
		message = 'Something went wrong.'
	}

	return message
}

//---------------------------------------------------------------
// Функция для изменения фона секции
//---------------------------------------------------------------
export function ChangeBackground() {
	const [fileName, setFileName] = useState<JSX.Element | string>('')
	const [responseMessage, setResponseMessage] = useState<JSX.Element | string>(
		''
	)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	//---------------------------------------------------------------
	// Функция для отправки файла на сервер и изменения Background
	//---------------------------------------------------------------
	const onSubmit = async ({ file }: z.infer<typeof formSchema>) => {
		if (file && file instanceof File) {


			try {
				const data = new FormData()
				data.set('file', file)

				const { success } = await uploadImage(data)

				setFileName(
					<ImagePlus
						className='hover:scale-125 transition-all'
						size={48}
						strokeWidth={0.5}
						absoluteStrokeWidth
					/>
				)

				if (success) {
					setResponseMessage(<p className="text-green-300 mt-[10px]">The image was successfully uploaded to the server</p>)

					setTimeout(() => setResponseMessage(''), 3000)
				}


				// Чтобы опять можно было выбрать тот же файл
				const inputFile = document.querySelector(
					'input[type="file"]'
				) as HTMLInputElement
				if (inputFile) {
					inputFile.value = ''
				}



			} catch (e: unknown) {
				console.error(getErrorMessage(e))

				setFileName(getErrorMessage(e))

				// Чтобы опять можно было выбрать тот же файл
				const inputFile = document.querySelector(
					'input[type="file"]'
				) as HTMLInputElement
				if (inputFile) {
					inputFile.value = ''
				}

				form.reset()

				// Запуск функции изменения 
			}
		} else {
			throw new Error('Something went wrong.')
		}
	}

	return (
		<Dialog>
			<DialogTrigger className='absolute bottom-24 right-6 animate-pulse'>
				<Image
					className='hover:scale-125 transition-all'
					size={48}
					strokeWidth={0.5}
					absoluteStrokeWidth
				/>
			</DialogTrigger>

			<DialogContent className={`px-[10px] py-[30px] max-w-[300px]`}>
				<DialogHeader>
					<DialogTitle className='text-center leading-7'>
						Are you want change background?
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8 flex flex-col justify-center items-center p-[25px] '
					>
						<FormField
							control={form.control}
							name='file'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center items-center w-full'>
									<FormControl>
										<div>
											<input
												id='file'
												className='hidden'
												type='file'
												onChange={e => {
													if (e.target.files && e.target.files[0]) {
														field.onChange(e.target.files[0])
														setFileName(e.target.files[0].name)
													}
												}}
											/>
											<label htmlFor='file' className='cursor-pointer flex flex-col items-center justify-center text-center'>
												{fileName ? (
													<>
													{fileName}
													{responseMessage}
													</>
												) : (
													<>
														<ImagePlus
															className='hover:scale-125 transition-all'
															size={48}
															strokeWidth={0.5}
															absoluteStrokeWidth
														/>
														{responseMessage}
													</>
												)}
											</label>
										</div>
									</FormControl>
									<FormMessage className='!mt-[20px]' />
								</FormItem>
							)}
						/>
						<Button type='submit'>choose new background</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
