'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLink({ slug, name }: { slug: string; name: string }) {
	const pathname = usePathname()
	return (
		<Link 
			className={cn('px-[20px] text-[12px] pb-[2px]', {
				['border-b']: pathname === `/${slug}`
			})}
			href={slug}
		>
			{name}
		</Link>
	)
}