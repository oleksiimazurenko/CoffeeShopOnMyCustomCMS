'use client'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { ImagePlus, PlusSquare } from 'lucide-react'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/helpers/extractErrorMessage'
import { uploadImage } from '@/shared/api/uploadImage'

// ---------------------------------------------------------------
// Описываем схему валидации
// ---------------------------------------------------------------
const formSchema = z.object({
	name: z.string().min(2).max(50),
	country: z.string().min(2).max(50),
	price: z.string().min(2).max(50),
	typeCard: z.enum(['best', 'normal'], {
		required_error: 'You need to select a notification type.',
	}),
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

// ---------------------------------------------------------------
// Компонент для создания карточки продукта
// ---------------------------------------------------------------
export function CreateProduct() {
	const [fileName, setFileName] = useState<JSX.Element | string>('')
	const [responseMessage, setResponseMessage] = useState<JSX.Element | string>(
		''
	)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			country: '',
			price: '',
			typeCard: 'normal',
		},
	})

	const onSubmit = async ({	name, country, price, typeCard, file }: z.infer<typeof formSchema>) => {
		if (file && file instanceof File) {
			try {


				// Создание объекта FormData для отправки на сервер и добавление в него файла
				const dataImage = new FormData()
				dataImage.set('file', file)
				//-----------------------------------------------------------------------------

				// Создание объекта FormData для отправки на сервер и добавления в базу данных
				const data = new FormData()
				data.set('name', name)
				data.set('country', country)
				data.set('price', price)
				data.set('typeCard', typeCard)
				data.set('file', file.name)
				//-----------------------------------------------------------------------------



				// Отправка файла на сервер и получение ответа
				const { success: successFile } = await uploadImage(dataImage, 'public/products/uploads')
				//-----------------------------------------------------------------------------
				// Отправка файла на сервер и получение ответа
				const { success: successFormData } = await uploadImage(dataImage, 'public/products/uploads')
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
				

				// Изменение сообщения в модальном окне
				if (successFile) {
					setResponseMessage(
						<p className='text-green-300 mt-[10px]'>
							The image was successfully uploaded to the server
						</p>
					)

					setTimeout(() => setResponseMessage(''), 1500)
				}
				//-----------------------------------------------------------------------------



				// Чтобы опять можно было выбрать тот же файл
				const inputFile = document.querySelector('#fileImageProduct') as HTMLInputElement
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
				const inputFile = document.querySelector('#fileImageProduct') as HTMLInputElement
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
			<DialogTrigger className='flex justify-center items-center bg-blue-300/50 rounded-lg hover:scale-105 transition w-[220px] h-[240px] border-dotted border border-sky-500'>
				<PlusSquare strokeWidth={0.5} absoluteStrokeWidth />
			</DialogTrigger>

			<DialogContent className={`px-[10px] max-w-[320px] `}>
				<DialogHeader>
					<DialogTitle className='text-center'>Create new product</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8 flex flex-col justify-center items-center '
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center items-center w-full'>
									<FormControl>
										<Input placeholder='name of the new product' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='country'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center items-center w-full'>
									<FormControl>
										<Input placeholder='name of the country' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center items-center w-full'>
									<FormControl>
										<Input placeholder='price' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='typeCard'
							render={({ field }) => (
								<FormItem className='!mt-[15px]'>
									<FormLabel>Select product type</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>

											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='best' />
												</FormControl>
												<FormLabel className='font-normal'>
													product type best
												</FormLabel>
											</FormItem>

											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='normal' />
												</FormControl>
												<FormLabel className='font-normal'>
													product type normal
												</FormLabel>
											</FormItem>

										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='file'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center items-center w-full'>
									<FormControl>
										<div>
											<input
												id='fileImageProduct'
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
												htmlFor='fileImageProduct'
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
						<Button type='submit'>create new product</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
