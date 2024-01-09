import { MainLogo } from '@/entities/mainLogo'
import { NavLink } from '@/entities/navLink'
import { getPages } from '@/shared/api/getPages'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { authOptions } from '@/shared/utils/nextAuth/auth'
import cn from 'classnames'
import { getServerSession } from 'next-auth'
import { navbarPropsType } from '../model/types'

export async function Navbar({
	type,
	DeletePage,
	CreatePage,
	LogIn,
	LogOut,
}: navbarPropsType) {
	const dataMenuItems = await getPages()
	const session = await getServerSession(authOptions)

	return (
		<nav
			className={cn('container flex items-end', {
				['text-slate-100/90 justify-start']: type === 'white',
				['text-slate-800/90 justify-center']: type === 'black',
			})}
		>
			<MainLogo type={type} />
			<ul className='flex'>
				{dataMenuItems
					.filter(
						({ type, isDisabled }) =>
							type !== 'not-iterable' && isDisabled !== true
					)
					.map(({ id, name, slug, type }) => (
						<li className='relative' key={id}>
							<NavLink slug={slug} name={name} />
							{session && (
								<DeletePage
									id={id}
									typePage={type as 'static' | 'dynamic' | 'not-iterable'}
								/>
							)}
						</li>
					))}
				{session && <CreatePage classNameTrigger='ml-[20px] animate-pulse hover:scale-125 transition-all' />}
			</ul>

			{LogIn ? (
				session && session.user ? (
					<div className='flex-1 flex justify-end items-center'>
						<div className='ml-auto block mr-4'>
							Hello Admin - {session.user.name || session.user.email}
						</div>
						<Avatar className='mr-2'>
							<AvatarImage
								src={
									session.user.image
										? session.user.image
										: 'https://github.com/shadcn.png'
								}
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						{LogOut && <LogOut />}
					</div>
				) : (
					<div className='flex-1 flex justify-end'>
						<LogIn />
					</div>
				)
			) : null}
		</nav>
	)
}
