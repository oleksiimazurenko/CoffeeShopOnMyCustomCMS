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
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

import { addPage } from '../api/addPage'

import {
	SheetTitle
} from '@/shared/ui/sheet'

const formSchema = z.object({
	name: z.string().min(2).max(50),
	slug: z.string().min(2).max(50),
})

export default function CreatePage() {


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	function onSubmit({ name, slug }: z.infer<typeof formSchema>) {
		addPage(name, slug, 'dynamic')
		form.reset()
	}

	return (
		<div className='p-[10px]'>
			<SheetTitle className='text-center'>Create new page</SheetTitle>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 flex flex-col justify-center items-center p-[25px] '
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='flex flex-col justify-center items-center w-full'>
								<FormControl>
									<Input placeholder='name of the new page' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='slug'
						render={({ field }) => (
							<FormItem className='flex flex-col justify-center items-center w-full'>
								<FormControl>
									<Input placeholder='path in the address bar' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>add new page</Button>
				</form>
			</Form>


		</div>
	)
}