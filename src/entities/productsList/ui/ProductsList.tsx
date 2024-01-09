import { authOptions } from '@/shared/utils/nextAuth/auth'
import { getServerSession } from 'next-auth'
import { productItem, propsProductsList } from '../model/types'

export async function ProductsList({
	data,
	pageType,
	ProductCard,
	CreateProduct,
}: propsProductsList) {
	const session = await getServerSession(authOptions)
	return (
		<>
			{data
				.filter(({ type }) => type === pageType)
				.map(({ id, src, alt, title, country, price }: productItem) => (
					<ProductCard
						key={id}
						src={src}
						alt={alt}
						title={title}
						country={country}
						price={price}
						pageType={pageType}
					/>
				))}
			{session && <CreateProduct />}
		</>
	)
}
