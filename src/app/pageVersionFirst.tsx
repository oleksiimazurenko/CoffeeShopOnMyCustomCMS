import { getPages } from '@/shared/api/getPages'
import AboutUs from '@/widgets/aboutUs/ui/AboutUs'
import BestProducts from '@/widgets/bestProducts/ui/BestProducts'
import IntroHome from '@/widgets/introHome/ui/IntroHome'
import parse from 'html-react-parser'

export default async function Home() {

	const defaultComponents = [<IntroHome />, <AboutUs />, <BestProducts />]

	const pages = await getPages()
	const dataPage = pages.find(({ type }) => type === 'not-iterable')

	//-----------------------------------------------------------------------------------------------------------------------

	const sortStringArray = (stringArray: string[]) => {

		// Функция для извлечения значения атрибута data-order
		const extractDataOrder = (htmlString: string) => {
			const match = htmlString.match(/<div.*?data-order='(\d+)'.*?>/);
			return match ? parseInt(match[1], 10) : null;
		};
	
		// Создаем массив объектов с data-order и исходной строкой
		const arrayWithDataOrder = stringArray.map(htmlString => {
			return { positionOrder: extractDataOrder(htmlString), htmlString };
		});
	
		// Фильтруем массив, удаляя элементы с null в dataOrder
		const filteredArray = arrayWithDataOrder.filter(item => item.positionOrder !== null);
	
		// Сортируем массив объектов по positionOrder
		filteredArray.sort((a, b) => {
			if (a.positionOrder !== null && b.positionOrder !== null) {
				return a.positionOrder - b.positionOrder;
			}
			return 0;
		});
	
		return filteredArray;

	}

	//-----------------------------------------------------------------------------------------------------------------------
	// Конвертация из массива строк или просто строки в массив JSX Elements или просто в один JSX Element
	const convertToReactComponentsArray = (stringHTMLStructure: string[] | string) => {
		if(Array.isArray(stringHTMLStructure)) return stringHTMLStructure.map(htmlString => parse(htmlString))
		return [ parse(stringHTMLStructure) ]
	}

	//-----------------------------------------------------------------------------------------------------------------------

	const convertFromStrToStrArr = (structure: string | undefined, defaultPlaceholder: string) => {

		const divPlaceholder = `<div className="text-center text-6xl pt-[120px] pb-[60px] bg-yellow-500">${defaultPlaceholder}</div>`
		return structure ? structure.split('##UNIQUE_DIVIDER##') : [ divPlaceholder ]

	}

	//-----------------------------------------------------------------------------------------------------------------------

	if(dataPage?.textContentStructure === 'DEFAULT') return defaultComponents.map((component, i) => <div text-content-structure='true' position-order={i + 1}>{component}</div>)
	
	//-----------------------------------------------------------------------------------------------------------------------

	const sortedStringInObjectArray = sortStringArray(convertFromStrToStrArr(dataPage?.textContentStructure, 'no text content structure in database'))

	const resultStringArraySorted = sortedStringInObjectArray.map(object => object.htmlString)

	const mixHTMLContentDOMElementsArray = convertToReactComponentsArray(resultStringArraySorted)

	return mixHTMLContentDOMElementsArray
}