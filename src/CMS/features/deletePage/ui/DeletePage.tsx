'use client'

import { SheetTitle } from '@/shared/ui/sheet'

import { ScrollArea } from '@/shared/ui/scroll-area'
import { Separator } from '@/shared/ui/separator'

import { XCircle } from 'lucide-react'
import { deletePage } from '../api/deletePage'
import { page } from '@prisma/client'

export default function DeletePage({ pages }: { pages: page[] }) {

	const filteredPages = pages.filter(({ type }) => type === 'dynamic')

	return (
		<div className='p-[10px]'>
			<SheetTitle className='text-center'>Delete page</SheetTitle>
			{
				<ScrollArea className='h-72 w-[70%] rounded-md border m-auto mt-[20px]'>
					<div className='p-4'>
						<h4 className='mb-4 text-sm font-medium leading-none text-xl text-center'>
							Page list
						</h4>
						{filteredPages.map(({ id, name }) => (
							<>
								<div
									key={id}
									className='text-sm flex justify-between items-center'
								>
									{name}
									<XCircle
										className='cursor-pointer hover:fill-red-700'
										onClick={() => deletePage(id)}
									/>
								</div>
								<Separator className='my-2' />
							</>
						))}
					</div>
				</ScrollArea>
			}
		</div>
	)
}