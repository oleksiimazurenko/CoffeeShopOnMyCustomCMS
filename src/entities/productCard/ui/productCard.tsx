'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/shared/ui/card'
import Image from 'next/image'
import { productCardPropsType } from '../model/types'
import Link from 'next/link'

export function ProductCard({
	src,
	alt,
	title,
	country,
	price,
	pageType,
}: productCardPropsType) {
	return (
		<Link href={'/'} className='cursor-pointer hover:scale-105 transition'>
			<Card className='rounded-8 bg-slate-50/90 w-[220px] h-[240px] overflow-hidden'>
			<CardHeader className='relative overflow-hidden p-0 w-full h-[150px]'>
				<Image
					fill={true}
					sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%" // Просто влепил что попало
					style={{ objectFit: 'cover' }}
					quality={100}
					src={`/products/${src}.png`} // косяк
					alt={alt}
				/>
			</CardHeader>

			<CardContent className='px-[10px] pb-0 pt-4'>
				<CardDescription className='text-black text-center text-[14px] font-normal'>
					{title}
				</CardDescription>
				{pageType === 'normal' && (
					<CardDescription className='mt-[14px] text-black text-center text-[14px] font-normal'>
						{country}
					</CardDescription>
				)}
			</CardContent>

			<CardFooter className='flex justify-end text-black self-end pt-[10px] pb-[10px]'>
				{price}
			</CardFooter>
		</Card>
		</Link>
	)
}
