import Image from 'next/image'
import Link from 'next/link'
import { navbarPropsType } from '../types/types'
import cn from 'classnames'
import { getPages } from '@/shared/api/getPages'

export default async function Navbar({ type }: navbarPropsType ) {

	const dataMenuItems = await getPages()

	return (
		<nav className={cn('container flex items-end', {
			['text-slate-100/90 justify-start']: type === 'white',
			['text-slate-800/90 justify-center']: type === 'black'
		})}>
			<Link href='/' className='px-[20px]'>
				<Image src={`/${type === 'white' ? 'logoWhite' : 'logoBlack'}.svg`} width={108} height={35} alt='logo' />
			</Link>
			<ul className='menu__list'>
				{dataMenuItems.filter(({ type }) => type !== 'no-iterable').map(({ id, name, slug }) => (
					<Link href={slug} key={id} className='px-[20px] text-[12px]'>
						{name}
					</Link>
				))}
			</ul>
		</nav>
	)
}