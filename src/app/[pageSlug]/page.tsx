import { getPages } from '@/shared/api/getPages'
import { PrismaClient, page } from '@prisma/client'


export const dynamicParams = false //почему-то не работает при production сборке


export async function generateStaticParams() {

	const pages = await getPages()
	const filteredPages = pages.filter(({ type }) => type === 'dynamic')

	return filteredPages.map(page => ({
		pageSlug: page.slug
	}))

}


export async function generateMetadata({ params: {pageSlug} }: {params: {pageSlug: string}}) {

	const prisma = new PrismaClient()
	const page: page | null = await prisma.page.findFirst({
		where: {
			slug: pageSlug,
		},
	})

	return {
		title: page?.name,
	}
}



export default async function Page({ params: {pageSlug} }: {params: {pageSlug: string}}) {

	const prisma = new PrismaClient()
	const page: page | null = await prisma.page.findFirst({
		where: {
			slug: pageSlug,
		},
	})

	let htmlContent: string | undefined = page?.textContentStructure
	if(!htmlContent) htmlContent = 'no content in database'

	return (
		<section className='content-area py-8 pt-[120px] pb-[120px] bg-gradient-to-r from-amber-200 via-orange-500 to-amber-300'>
			<article>
				<h1 className='text-6xl text-center py-8'>
					{page?.name}
				</h1>
				<div
					// dangerouslySetInnerHTML={{ __html: htmlContent }}
					className='post-content container mx-auto lg:max-w-4xl text-center'
				/>
			</article>
		</section>
	)

}