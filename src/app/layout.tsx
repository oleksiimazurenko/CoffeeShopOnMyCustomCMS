import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import type { Metadata } from 'next'
import { Merienda } from 'next/font/google'
import './globals.css'

const merienda = Merienda({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Coffee Shop',
	description: 'Coffee Shop',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

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