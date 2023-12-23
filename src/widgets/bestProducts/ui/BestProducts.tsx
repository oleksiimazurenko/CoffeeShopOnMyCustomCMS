import ProductsList from '@/entities/productsList/ui/ProductsList'
import { getBestProductsList } from '../api/getBestProductsList'
export default async function BestProducts() {
	const data = await getBestProductsList()

	return (
		<section className='pt-[80px] pb-[110px] bg-cover bg-center bg-no-repeat bg-our-best bg-parchment'>
			<div className='container'>
				<h2 className='text-center text-black text-[24px] leading-normal'>
					Our best
				</h2>

				<div className='grid grid-cols-[repeat(3,minmax(0,220px))] justify-center justify-items-center items-center gap-[70px] mt-[40px]'>
					<ProductsList data={data} type='best' />
				</div>
			</div>
		</section>
	)
}
