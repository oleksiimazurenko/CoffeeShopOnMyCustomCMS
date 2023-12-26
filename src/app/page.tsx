import DnD from '@/features/CMS/features/DnD/ui/DnD'
import { getBestProductsList } from '@/shared/api/getBestProductsList'
import { getPages } from '@/shared/api/getPages'
import { typeCurrentItemsDnD } from '@/shared/stores/allDataStore'
import AboutUs from '@/widgets/aboutUs/ui/AboutUs'
import BestProducts from '@/widgets/bestProducts/ui/BestProducts'
import IntroHome from '@/widgets/introHome/ui/IntroHome'

export default async function Home() {
	const pages = await getPages()
	const dataPage = pages.find(({ type }) => type === 'not-iterable')

	const dataBestProductItem = await getBestProductsList()

	const initialItems = [
		{
			id: 'IntroHome-1',
			content: <div text-content-structure='true'>{<IntroHome/>}</div>,
		},
		{
			id: 'AboutUs-2',
			content: <div text-content-structure='true'>{<AboutUs />}</div>,
		},
		{
			id: 'BestProducts-3',
			content: <div text-content-structure='true'>{<BestProducts />}</div>,
		}
	]

	const convertFromStrToObjArr = (structure: string | undefined, errorPlaceholder: string): typeCurrentItemsDnD[]  => {

		const divErrorPlaceholder = `<div className="text-center text-6xl pt-[120px] pb-[60px] bg-yellow-500">${errorPlaceholder}</div>`

		const itemsArray: typeCurrentItemsDnD[] = structure ? structure.split('##UNIQUE_DIVIDER##').map(itemString => JSON.parse(itemString)) : [ divErrorPlaceholder ]


		return itemsArray 

		// ##UNIQUE_ITERABLE_CONTENT##
		// <ProductsList data={dataBestProductItem} type='best' />

	}

	// const result = convertFromStrToObjArr(dataPage?.textContentStructure, 'data base empty')



	if (dataPage?.textContentStructure === 'DEFAULT') return <DnD initialItems={initialItems} pageID={1}/>

	// return <DnD initialItems={result} pageID={1}/>
}
