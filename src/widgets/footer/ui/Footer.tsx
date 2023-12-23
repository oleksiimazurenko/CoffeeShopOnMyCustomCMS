import Navbar from '@/features/navbar/ui/Navbar'
import React from 'react'
import Image from 'next/image'

export default async function Footer() {

	return (
		<footer className='flex flex-col justify-center items-center py-[30px] w-full'>
			<Navbar type='black'/>
			<Image className='mt-[30px]' src='/logoBlackLine.svg' width={200} height={30} alt='logo'/>
		</footer>
	)
}