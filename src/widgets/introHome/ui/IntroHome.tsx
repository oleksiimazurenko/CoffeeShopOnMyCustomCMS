import TextEditor from '@/features/CMS/features/textEditor/ui/textEditor'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'

export default function IntroHome() {
	return (
		<section className='bg-no-repeat bg-center bg-cover bg-desktop h-[640px]'>
			<div className='container flex flex-col justify-center items-center pt-[180px]'>
				<h1 className='text-stroke-05-black text-shadow-xl text-slate-50 font-bold text-4xl transition-all duration-1000 ease-in'>
					<TextEditor>Everything You Love About Coffee</TextEditor>
				</h1>
				<Image
					className='mt-[20px]'
					width={200}
					height={30}
					src='/logoWhiteLine.svg'
					alt='whiteLogo'
				/>
				<h3 className='text-stroke-05-black text-shadow-xl text-2xl font-bold mt-8 leading-none max-w-[530px] w-full text-slate-50'>
					<TextEditor>We makes every day full of energy and taste</TextEditor>
				</h3>
				<h3 className='mt-5 text-shadow-md text-xl font-bold text-slate-50'>
					<TextEditor>Want to try our beans?</TextEditor>
				</h3>
				<Button className='mt-4 border-2 border-white border-opacity-50 rounded-sm bg-transparent shadow-md px-10 py-2 text-[14px] font-bold text-slate-50 hover:bg-slate-50 hover:text-slate-800'>
				<TextEditor>More</TextEditor>
				</Button>
			</div>
		</section>
	)
}
