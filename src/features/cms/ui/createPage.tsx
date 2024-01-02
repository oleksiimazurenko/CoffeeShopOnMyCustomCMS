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

import { createPage } from '../api/createPage'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { PlusSquare } from 'lucide-react'

const formSchema = z.object({
	name: z.string().min(2).max(50),
	slug: z.string().min(2).max(50),
})

type CreatePageProps = {
  classNameTrigger?: string;
  classNameContent?: string;
};

export function CreatePage({
	classNameTrigger,
	classNameContent,
}: {
	classNameTrigger?: string
	classNameContent?: string
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	function onSubmit({ name, slug }: z.infer<typeof formSchema>) {
		createPage(name, slug, 'dynamic')
		form.reset()
	}

	return (
		<Dialog>
			<DialogTrigger className={`${classNameTrigger}`}>
				<PlusSquare />
			</DialogTrigger>

			<DialogContent
				className={`px-[10px] py-[30px] min-w-[370px] ${classNameContent}`}
			>
				<DialogHeader>
					<DialogTitle className='text-center'>Create new page</DialogTitle>
				</DialogHeader>
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
			</DialogContent>
		</Dialog>
	)
}