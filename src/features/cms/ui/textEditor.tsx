'use client'

import { updateTextContent } from '@/features/cms/api/updateTextContent'
import { useIsAuthorizedStore } from '@/shared/store/store'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import cn from 'classnames'
import { takeTextContentStructure } from '../model/takeTextContentStructure'

export function TextEditor({
	children,
}: {
	children: React.ReactNode | JSX.Element | string
}) {
	const { isAuthorized } = useIsAuthorizedStore()
	const contentRef = useRef<HTMLDivElement>(null)
	const pathName = usePathname()

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
		<>
			{isAuthorized ? (
				<span
					className={cn('', {
						['cursor-pointer']: isAuthorized === true,
					})}
					data-texteditor={isAuthorized}
					contentEditable={true}
					ref={contentRef}
					onInput={handleInput}
				/>
			) : (
				children
			)}
		</>
	)
}
