import InitialisationCMS from '@/features/CMS/app'
import { getPages } from '@/shared/api/getPages'
import Footer from '@/widgets/footer/ui/Footer'
import Header from '@/widgets/header/ui/Header'
import type { Metadata } from 'next'
import { Merienda } from 'next/font/google'
import './globals.css'

const merienda = Merienda({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Coffee Shop',
	description: 'Coffee Shop',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pages = await getPages()

	return (
		<html lang='en'>
			<body className={merienda.className}>
				{/* <Header /> */}
				<main className='max-w-[2100px] m-auto'>{children}</main>
				<Footer />
				<InitialisationCMS /> 
			</body>
		</html>
	)
}
