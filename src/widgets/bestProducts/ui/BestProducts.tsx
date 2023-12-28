import ProductsList from '@/entities/productsList/ui/ProductsList'
import TextEditor from '@/features/CMS/features/textEditor/ui/textEditor'
import { getProductsList } from '@/shared/api/getProductsList'
export default async function BestProducts() {
	const data = await getProductsList()

	return (
		<section className='pt-[80px] pb-[110px] bg-cover bg-center bg-no-repeat bg-our-best bg-parchment'>
			<div className='container'>
				<h2
					extra-title-section='true'
					className='text-center text-black text-[24px] leading-normal'
				>
					<TextEditor>Our best</TextEditor>
				</h2>

				<div iterable-structure='true' className='grid grid-cols-[repeat(3,minmax(0,220px))] justify-center justify-items-center items-center gap-[70px] mt-[40px]'>
					<ProductsList data={data} pageType='best' />
				</div>
			</div>
		</section>
	)
}