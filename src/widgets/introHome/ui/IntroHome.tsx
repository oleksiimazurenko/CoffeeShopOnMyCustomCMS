import { TextEditor } from '@/features/cms'
import { PrimaryButton } from '@/entities/primaryButton'
import Image from 'next/image'

export function IntroHome() {
	return (
		<section
			data-background-image-element={true}
			className='h-[640px] bg-no-repeat bg-center bg-cover'
			style={{ backgroundImage: `url(/firstSectionBG.jpg)` }}
		>
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
				<PrimaryButton>
					<TextEditor>More</TextEditor>
				</PrimaryButton>
			</div>
		</section>
	)
}
