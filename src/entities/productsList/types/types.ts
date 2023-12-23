
export type productItem = {
	id: number
	src: string
	alt: string
	title: string
	country?: string
	price: string
}

export type productList = productItem[]

export type propsProductsList = {
	data: productList
	type: 'main' | 'best'
}