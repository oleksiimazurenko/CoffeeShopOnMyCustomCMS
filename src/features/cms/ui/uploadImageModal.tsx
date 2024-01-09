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
import React from 'react'
import { takeTextContentStructure } from '../model/takeTextContentStructure'
import { updateTextContent } from '../api/updateTextContent'
import { usePathname } from 'next/navigation'
import { getErrorMessage } from '@/shared/helpers/extractErrorMessage'

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
// Компонент модального окна для загрузки фото на сервер
//---------------------------------------------------------------
export function UploadImageModal() {
	const [fileName, setFileName] = useState<JSX.Element | string>('')
	const closedDOMElement = React.useRef<((fileName: string) => void) | null>(null)
	const [responseMessage, setResponseMessage] = useState<JSX.Element | string>(
		''
	)
	const pathName = usePathname()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	//---------------------------------------------------------------------------------------
	//Длеаем замыкание для сохранения ссылки на ДОМ элемент для последующей модификации
	//---------------------------------------------------------------------------------------
	const elementDOMClosure = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const parentElement = e.currentTarget.parentElement

		const backgroundElement = parentElement
			?.querySelector('[text-content-structure]')
			?.querySelector('[data-background-image-element]') as HTMLElement

		if (backgroundElement) {
			return (fileName: string) => {
				backgroundElement.style.backgroundImage = `url(/uploads/${fileName})`
			}
		}
	}

	//---------------------------------------------------------------
	// Функция для отправки файла на сервер и изменения Background
	//---------------------------------------------------------------
	const onSubmit = async ({ file }: z.infer<typeof formSchema>) => {
		if (file && file instanceof File) {
			try {


				// Создание объекта FormData для отправки на сервер и добавление в него файла
				const data = new FormData()
				data.set('file', file)
				//-----------------------------------------------------------------------------



				// Отправка файла на сервер и получение ответа
				const { success } = await uploadImage(data, 'public/uploads')
				//-----------------------------------------------------------------------------



				// Изменение имени файла в модальном окне
				setFileName(
					<ImagePlus
						className='hover:scale-125 transition-all'
						size={48}
						strokeWidth={0.5}
						absoluteStrokeWidth
					/>
				)
				//-----------------------------------------------------------------------------
				


				// Изменение Background на прямую в DOM структуре
				if (closedDOMElement.current) closedDOMElement.current(file.name)
				//-----------------------------------------------------------------------------



				// Записываем изменения на сервер 
				updateTextContent(pathName ,takeTextContentStructure())
				//-----------------------------------------------------------------------------

				

				// Изменение сообщения в модальном окне
				if (success) {
					setResponseMessage(
						<p className='text-green-300 mt-[10px]'>
							The image was successfully uploaded to the server
						</p>
					)

					setTimeout(() => setResponseMessage(''), 1500)
				}
				//-----------------------------------------------------------------------------



				// Чтобы опять можно было выбрать тот же файл
				const inputFile = document.querySelector('#fileImageChangeBackground') as HTMLInputElement
				if (inputFile) {
					inputFile.value = ''
				}
				//-----------------------------------------------------------------------------



				// Сброс формы
				form.reset()

			} catch (e: unknown) {

				// Вывод ошибки в консоль
				console.error(getErrorMessage(e))

				// Изменение сообщения в модальном окне на ошибку
				setFileName(getErrorMessage(e))

				// Чтобы опять можно было выбрать тот же файл
				const inputFile = document.querySelector('#fileImageChangeBackground') as HTMLInputElement
				if (inputFile) {
					inputFile.value = ''
				}

				// Сброс формы
				form.reset()

			}
		} else {
			throw new Error('Something went wrong.')
		}
	}

	return (
		<Dialog>
			<DialogTrigger
				onClick={e => {
					const closedFunc = elementDOMClosure(e)
					closedFunc ? closedDOMElement.current = closedFunc : null
				}}
				className='absolute bottom-24 right-6 animate-pulse'
			>
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
												id='fileImageChangeBackground'
												className='hidden'
												type='file'
												onChange={e => {
													if (e.target.files && e.target.files[0]) {
														field.onChange(e.target.files[0])
														setFileName(e.target.files[0].name)
													}
												}}
											/>
											<label
												htmlFor='fileImageChangeBackground'
												className='cursor-pointer flex flex-col items-center justify-center text-center'
											>
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
