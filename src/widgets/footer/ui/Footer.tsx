import { CreatePage, DeletePage } from '@/features/cms'
import { Navbar } from '@/features/navbar'
import Image from 'next/image'

export async function Footer() {
	return (
		<footer className='flex flex-col justify-center items-center py-[30px] w-full'>
			<Navbar type='black' DeletePage={DeletePage} CreatePage={CreatePage}/>
			<Image
				className='mt-[30px]'
				src='/logoBlackLine.svg'
				width={200}
				height={30}
				alt='logo'
			/>
		</footer>
	)
}
