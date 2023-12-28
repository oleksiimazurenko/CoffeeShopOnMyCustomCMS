
export type productItem = {
	id: number
	src: string
	alt: string
	title: string
	country?: string
	price: string
	type: string
}

export type productList = productItem[]

export type propsProductsList = {
	data: productList
	pageType: 'normal' | 'best'
}