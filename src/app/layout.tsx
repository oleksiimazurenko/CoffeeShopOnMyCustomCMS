import { getPages } from '@/shared/api/getPages'
import type { Metadata } from 'next'
import { Merienda } from 'next/font/google'
import './globals.css'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

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
				<Header />
				<main className='max-w-[2100px] m-auto'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
