'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { contentEditable } from '../features/updateTextContent/lib/utils/contentEditable'
import { onChangeTextNode } from '../features/updateTextContent/lib/utils/onChangeTextNode'

export default function  InitialisationCMS () {

	const path = usePathname()

	useEffect(() => {
		contentEditable() // Ставим contentEditable на родителя всех текстовых нод в секции на которой аттрибут text-content-structure = true. DOM структура секции содержит только текстовые ноды.
	}, [path])

	useEffect(() => {
		onChangeTextNode(1)
	}, []) // Потому что под индексом один у нас главная страница в базе данных

	return <></>
}