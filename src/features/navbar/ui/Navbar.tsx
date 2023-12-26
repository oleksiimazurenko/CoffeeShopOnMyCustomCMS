import DeletePage from '@/features/CMS/features/deletePage/ui/DeletePage'
import { getPages } from '@/shared/api/getPages'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { navbarPropsType } from '../types/types'
import CreatePage from '@/features/CMS/features/createPage/ui/CreatePage'

export default async function Navbar({ type }: navbarPropsType) {
	const dataMenuItems = await getPages()

	return (
		<nav
			className={cn('container flex items-end', {
				['text-slate-100/90 justify-start']: type === 'white',
				['text-slate-800/90 justify-center']: type === 'black',
			})}
		>
			<Link href='/' className='px-[20px]'>
				<Image
					src={`/${type === 'white' ? 'logoWhite' : 'logoBlack'}.svg`}
					width={108}
					height={35}
					alt='logo'
				/>
			</Link>
			<ul className='flex'>
				{dataMenuItems
					.filter(
						({ type, isDisabled }) =>
							type !== 'not-iterable' && isDisabled !== true
					)
					.map(({ id, name, slug, type }) => (
						<li className='relative' key={id}>
							<Link href={slug} className='px-[20px] text-[12px]'>
								{name}
							</Link>
							<DeletePage
								id={id}
								typePage={type as 'static' | 'dynamic' | 'not-iterable'}
							/>
						</li>
					))}
					<CreatePage classNameTrigger='ml-[20px] animate-pulse hover:scale-125 transition-all'/>
			</ul>
		</nav>
	)
}
