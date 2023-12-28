'use client'

import { updateTextContent } from '@/features/CMS/shared/api/updateTextContent'
import {
	useIsAuthorizedStore,
	useTextContentStore,
} from '@/shared/stores/allDataStore'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { takeTextContentStructure } from '../utils/takeTextContentStructure'

import cn from 'classnames'

export default function TextEditor({
	children,
}: {
	children: React.ReactNode | JSX.Element | string
}) {
	const { isAuthorized } = useIsAuthorizedStore()
	const contentRef = useRef<HTMLDivElement>(null)
	const path = usePathname()
	const { setTextContent } = useTextContentStore()

	useEffect(() => {
		if (contentRef.current && typeof children === 'string') {
			contentRef.current.textContent = children
		}
	}, [children])

	const handleInput = () => {
		const combinedString = takeTextContentStructure(setTextContent)
		updateTextContent(path, combinedString) // Отправляем данные на сервер
	}

	return (
		<>
			{isAuthorized ? (
				<div
					className={cn('', {
						['cursor-pointer']: isAuthorized === true
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