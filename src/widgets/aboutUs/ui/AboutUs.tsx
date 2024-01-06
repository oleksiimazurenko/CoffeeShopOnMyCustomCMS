import { TextEditor } from '@/features/cms'
import Image from 'next/image'

export function AboutUs() {
	return (
		<section
			data-background-image-element={true}
			style={{ backgroundImage: `url()` }}
			className='pt-[80px] pb-[100px]'
		>
			<div className='container flex flex-col justify-center items-center'>
				<h2 className='text-black text-2xl'>
					<TextEditor>About Us</TextEditor>
				</h2>
				<Image
					className='mt-[20px]'
					width={200}
					height={30}
					src='/logoBlackLine.svg'
					alt='blackLogo'
				/>
				<div className='mt-[40px] max-w-2xl w-full nth:child(2):mt-30'>
					<p className='text-black text-center text-sm leading-normal'>
						<TextEditor>
							Extremity sweetness difficult behaviour he of. On disposal of as
							landlord horrible. Afraid at highly months do things on at.
							Situation recommend objection do intention so questions. As
							greatly removed calling pleased improve an. Last ask him cold feel
							met spot shy want. Children me laughing we prospect answered
							followed. At it went is song that held help face.
						</TextEditor>
					</p>
					<p className='text-black text-center text-sm leading-normal mt-[20px]'>
						<TextEditor>
							Now residence dashwoods she excellent you. Shade being under his
							bed her, Much read on as draw. Blessing for ignorant exercise any
							yourself unpacked. Pleasant horrible but confined day end
							marriage. Eagerness furniture set preserved far recommend. Did
							even but nor are most gave hope. Secure active living depend son
							repair day ladies now.
						</TextEditor>
					</p>
				</div>
			</div>
		</section>
	)
}
