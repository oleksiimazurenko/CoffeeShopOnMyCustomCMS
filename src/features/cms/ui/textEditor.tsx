'use client'

import { updateTextContent } from '@/features/cms/api/updateTextContent'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'
import { takeTextContentStructure } from '../model/takeTextContentStructure'
import cn from 'classnames'

export function TextEditor({
	children,
}: {
	children: React.ReactNode | JSX.Element | string
}) {
	const contentRef = useRef<HTMLDivElement>(null)
	const pathName = usePathname()
	const { status } = useSession()

	useEffect(() => {
		if (contentRef.current && typeof children === 'string') {
			contentRef.current.textContent = children
		}
	}, [children])

	const handleInput = () => {
		const combinedString = takeTextContentStructure()
		updateTextContent(pathName, combinedString) // Отправляем данные на сервер
	}

	return (
		<span
			className={cn('', {
				['cursor-pointer']: status === 'authenticated',
			})}
			data-texteditor={true}
			contentEditable={status === 'authenticated'}
			ref={contentRef}
			onInput={() => {
				status === 'authenticated' && handleInput()
			}}
		/>
	)
}
