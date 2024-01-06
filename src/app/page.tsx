import { ProductsList } from '@/entities/productsList'
import { UploadImageModal, DnD, TextEditor } from '@/features/cms'
import { getPages } from '@/shared/api/getPages'
import { getProductsList } from '@/shared/api/getProductsList'
import { typeCurrentItemsDnD } from '@/shared/store/store'
import { AboutUs } from '@/widgets/aboutUs'
import { BestProducts } from '@/widgets/bestProducts'
import { IntroHome } from '@/widgets/introHome'
import parse, {
	DOMNode,
	Element,
	HTMLReactParserOptions,
	domToReact,
} from 'html-react-parser'

export default async function Home() {
	const pages = await getPages()
	const dataPage = pages.find(({ type }) => type === 'not-iterable')

	const dataBestProductItem = (await getProductsList()).filter(
		({ type }) => type === 'best'
	)

	const initialArrayObjectsForDnD: typeCurrentItemsDnD[] = [
		{
			id: 'item-1',
			content: <div text-content-structure='true'>{<IntroHome />}</div>,
		},
		{
			id: 'item-2',
			content: <div text-content-structure='true'>{<AboutUs />}</div>,
		},
		{
			id: 'item-3',
			content: <div text-content-structure='true'>{<BestProducts />}</div>,
		},
	]

	// В данный момент не хватает знаний как вынести эту функцию в отдельный файл или как её сделать универсальной
	const parseHTMLToReactComponents = (htmlString: string): React.ReactNode => {
		const options: HTMLReactParserOptions = {
			replace: domNode => {

				if (
					domNode instanceof Element &&
					domNode.name === 'span' &&
					domNode.attribs['data-texteditor'] !== undefined
				) {
					const domNodes: DOMNode[] = Array.from(
						domNode.children
					) as unknown as DOMNode[]
					const children = domToReact(domNodes, options)
					return <TextEditor>{children}</TextEditor>
				}

				if (
					domNode.type === 'text' &&
					domNode.data.includes('##UNIQUE_ITERABLE_CONTENT__PRODUCT_LIST##')
				) {
					// Заменяем текстовый узел на компонент ProductsList
					return <ProductsList data={dataBestProductItem} pageType='best' />
				}
			},
		}
		return parse(htmlString, options)
	}

	const convertFromStrToObjArr = (
		structure: string | undefined,
		errorPlaceholder: string
	) => {
		const divErrorPlaceholder = `<div className="text-center text-6xl pt-[120px] pb-[60px] bg-yellow-500">${errorPlaceholder}</div>`
		const itemsArray = structure
			? structure.split('##UNIQUE_DIVIDER##')
			: [divErrorPlaceholder]
		return itemsArray
	}

	const resultArrayObjectsForDnD: typeCurrentItemsDnD[] =
		convertFromStrToObjArr(dataPage?.textContentStructure, 'data base empty')
			.map(item => parseHTMLToReactComponents(item))
			.map((item, i) => ({
				id: initialArrayObjectsForDnD[i].id,
				content: item,
			}))

	if (dataPage?.textContentStructure === 'DEFAULT')
		return <DnD initialItems={initialArrayObjectsForDnD} UploadImageModal={UploadImageModal}/>

	return <DnD initialItems={resultArrayObjectsForDnD} UploadImageModal={UploadImageModal}/>
}
