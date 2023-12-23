import { getPages } from '@/shared/api/getPages'
import AboutUs from '@/widgets/aboutUs/ui/AboutUs'
import BestProducts from '@/widgets/bestProducts/ui/BestProducts'
import IntroHome from '@/widgets/introHome/ui/IntroHome'
import parse from 'html-react-parser'

export default async function Home() {
	const pages = await getPages()
	const dataPage = pages.find(({ type }) => type === 'no-iterable')

	let htmlContent: string | undefined = dataPage?.textContentStructure
	if (!htmlContent) htmlContent = 'no content in database'

	return (
		<>
			{dataPage?.textContentStructure === 'DEFAULT' ? (
				<div text-editable='true'>
					<IntroHome />
					<AboutUs />
				</div>
			) : 
				parse(htmlContent)
			}

			<div iteration-editable='true'>
				<BestProducts />
			</div>
		</>
	)
}