import React from 'react'
import Image from 'next/image'

export function AboutUs() {
	return (
		<section className="pt-[80px] pb-[100px]">
			<div className="container flex flex-col justify-center items-center">
				<h2 className="text-black text-2xl">About Us</h2>
				<Image className="mt-[20px]" width={200} height={30} src='/logoBlackLine.svg' alt="blackLogo"/>
				<div className="mt-[40px] max-w-2xl w-full nth:child(2):mt-30">
					<p className='text-black text-center text-sm leading-normal'>Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. Afraid at highly months do things on at. Situation recommend objection do intention so questions. As greatly removed calling pleased improve an. Last ask him cold feel met spot shy want. Children me laughing we prospect answered followed. At it went is song that held help face.</p>
					<p className='text-black text-center text-sm leading-normal mt-[20px]' >Now residence dashwoods she excellent you. Shade being under his bed her, Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.</p>
				</div>
			</div>
		</section>
	)
}