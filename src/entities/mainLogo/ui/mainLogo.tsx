'use client';

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

export function MainLogo({type}: {type: 'white' | 'black'}) {

	const pathname = usePathname()

	return (
		<Link href='/' className='px-[20px]'>
				<Image
					className={cn('', {
						['border-b']: pathname === '/'
					})}
					src={`/${type === 'white' ? 'logoWhite' : 'logoBlack'}.svg`}
					width={108}
					height={35}
					alt='logo'
				/>
			</Link>
	)
}
