import { ProductsList } from '@/entities/productsList'
import { UploadImageModal, DnD, TextEditor } from '@/features/cms'
import { getPages } from '@/shared/api/getPages'
import { getProductsList } from '@/shared/api/getProductsList'
import { typeCurrentItemsDnD } from '@/shared/store/store'
import { authOptions } from '@/shared/utils/nextAuth/auth'
import { AboutUs } from '@/widgets/aboutUs'
import { BestProducts } from '@/widgets/bestProducts'
import { IntroHome } from '@/widgets/introHome'
import parse, {
	DOMNode,
	Element,
	HTMLReactParserOptions,
	domToReact,
} from 'html-react-parser'
import { getServerSession } from 'next-auth'

export default async function Home() {
	
	// Получаем общие данные для всех страниц
	const pages = await getPages()
	// Получаем данные для конкретной страницы
	const dataPage = pages.find(({ type }) => type === 'not-iterable')
	// Получаем данные для BestProducts
	const dataBestProductItem = (await getProductsList()).filter(
		({ type }) => type === 'best'
	)
	// Получаем активность сессии
	const session = await getServerSession(authOptions)


	// --------------------------------------------------------------------------------
	// Массив объектов для DnD, который будет использоваться в качестве начального
	// --------------------------------------------------------------------------------
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


	// --------------------------------------------------------------------------------------------------------------------------------------------
	// Эта фкнкция принимает строку с HTML и возвращает React-компоненты, должна находится непосредственно в компоненте, которая рендерит HTML
	// --------------------------------------------------------------------------------------------------------------------------------------------
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


	// --------------------------------------------------------------------------------------------------------------------------------------------------------
	// Эта функция принимает строку с HTML и возвращает массив объектов, (каждый объект это строка с HTML), каждый объект в этом массиве будет использоваться в качестве аргумента в функцию parseHTMLToReactComponents
	// --------------------------------------------------------------------------------------------------------------------------------------------------------
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

	// --------------------------------------------------------------------------------
	// Этот массив объектов будет использоваться в качестве props для компонента DnD
	// --------------------------------------------------------------------------------
	const fromDataBaseArrayObjectsForDnD: typeCurrentItemsDnD[] =
		convertFromStrToObjArr(dataPage?.textContentStructure, 'data base empty')
			.map(item => parseHTMLToReactComponents(item))
			.map((item, i) => ({
				id: initialArrayObjectsForDnD[i].id,
				content: item,
			}))

	if(session) {
		if (dataPage?.textContentStructure === 'DEFAULT'){
			return <DnD initialItems={initialArrayObjectsForDnD} UploadImageModal={UploadImageModal}/>
		}else{
			return <DnD initialItems={fromDataBaseArrayObjectsForDnD} UploadImageModal={UploadImageModal}/>
		}
	}

	if(!session){
		if (dataPage?.textContentStructure === 'DEFAULT'){
			return initialArrayObjectsForDnD.map(item => item.content)
		}else{
			return fromDataBaseArrayObjectsForDnD.map(item => item.content)
		}
		
	}
}