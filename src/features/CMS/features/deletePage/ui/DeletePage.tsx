'use client'

import { isDisabledPage } from '@/features/navbar/api/isDisabledPage'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { deletePage } from '../api/deletePage'

export default function DeletePage({
	id,
	typePage,
}: {
	id: number
	typePage: 'dynamic' | 'static' | 'not-iterable'
}) {
	return (
		<Dialog>
			<DialogTrigger className='absolute top-[-5px] right-0 animate-pulse'>
				<XCircle className='w-[15px] h-[15px] hover:scale-125 transition-all' />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>
						Are you sure you want to delete the page?
					</DialogTitle>
				</DialogHeader>

				<DialogClose asChild>
					<Button type='button' variant='secondary' className='hover:bg-slate-200/80'>
						Close
					</Button>
				</DialogClose>
				<Link href='/' className='contents'>
					<Button
						className='bg-red-400 hover:bg-red-500'
						onClick={() => {
							if (typePage === 'static') {
								isDisabledPage(id, true)
							}
							if (typePage === 'dynamic') {
								deletePage(id)
							}
						}}
					>
						Delete
					</Button>
				</Link>
			</DialogContent>
		</Dialog>
	)
}
