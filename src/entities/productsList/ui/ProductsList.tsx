import Image from 'next/image'
import { productItem, propsProductsList } from '../types/types'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/shared/ui/card'

export default function ProductsList({ data, type }: propsProductsList) {
	return (
		<div iterable-structure='true'>
			{data.map(({ id, src, alt, title, country, price }: productItem) => (
				<Card
					key={id}
					className='rounded-8 bg-slate-50/90 p-[20px] w-[220px] h-[240px]'
				>
					<CardHeader className='overflow-hidden p-0'>
						<Image
							className='rounded-md m-auto w-[150px] h-[130px]'
							width={150}
							height={130}
							src={`/products/${src}.png`} // косяк
							alt={alt}
						/>
					</CardHeader>

					<CardContent className='mt-[10px] p-0'>
						<CardDescription className='text-black text-center text-[14px] font-normal'>
							{title}
						</CardDescription>
						{type === 'main' && (
							<CardDescription className='mt-[14px] text-black text-center text-[14px] font-normal'>
								{country}
							</CardDescription>
						)}
					</CardContent>

					<CardFooter className='flex justify-end mt-[10px] text-black self-end p-0'>
						{price}
					</CardFooter>
				</Card>
			))}
		</div>
	)
}