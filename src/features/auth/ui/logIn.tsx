'use client'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/shared/ui/button'
import { CardDescription } from '@/shared/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/shared/ui/form'
import { Github } from 'lucide-react'

import { PrimaryButton } from '@/entities/primaryButton'
import { signIn } from 'next-auth/react'
import { toast } from '@/shared/ui/use-toast'

const formSchema = z.object({
	email: z.string().email().min(2).max(50),
})

export function LogIn() {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	})

	async function onSubmit({ email }: z.infer<typeof formSchema>) {
		const signInResult = await signIn('email', {
			email: email, 
			callbackUrl: `${window.location.origin}`,
			redirect: false,
		})

		form.reset()

		if(!signInResult?.ok){
			return toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive'
			})
		}

		return toast({
			title: 'Check your email',
			description: 'We sent a magic link to your email address',
			
		})
		
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<PrimaryButton>Log In</PrimaryButton>
			</DialogTrigger>
			<DialogContent className={`px-[20px] py-[30px] max-w-[350px]`}>
				<DialogHeader>
					<DialogTitle className='text-center'>Please sign in</DialogTitle>
					<CardDescription className='text-center !mt-4'>
						To access the private page you have to be authenticated
					</CardDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col justify-center items-center'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center items-center w-full'>
									<FormControl>
										<Input placeholder='Your email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='mt-4 w-full'>
							Log In
						</Button>
					</form>
				</Form>
				<Button
					className='mt-0'
					variant='secondary'
					onClick={() =>
						signIn('github', { callbackUrl: `${window.location.origin}` })
					}
				>
					Login with GitHub <Github className='w-4 h-4 ml-4' />
				</Button>
			</DialogContent>
		</Dialog>
	)
}
