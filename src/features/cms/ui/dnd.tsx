'use client'

import {
	typeCurrentItemsDnD,
	useDnDStore,
	useTextContentStore,
} from '@/shared/store/store'
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateTextContent } from '../api/updateTextContent'
import { takeTextContentStructure } from '../model/takeTextContentStructure'

export function DnD({ initialItems }: { initialItems: typeCurrentItemsDnD[] }) {
	const { currentItems, setDnDItems } = useDnDStore()
	const { currentTextContent, setTextContent } = useTextContentStore()
	const [isMounted, setIsMounted] = useState(false)
	const pathName = usePathname()

	useEffect(() => {
		// Установка начального состояния
		setDnDItems(initialItems)
		setIsMounted(true)
	}, [initialItems, setDnDItems])

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return
		}

		const reorderedItems = reorder(
			currentItems,
			result.source.index,
			result.destination.index
		)

		setDnDItems(reorderedItems)

		// Здесь также можно сохранить новый порядок в базу данных

		currentTextContent !== ''
			? updateTextContent(pathName, currentTextContent)
			: updateTextContent(pathName, takeTextContentStructure(setTextContent))
	}

	// Функция для переупорядочивания элементов
	const reorder = (
		list: typeCurrentItemsDnD[],
		startIndex: number,
		endIndex: number
	): typeCurrentItemsDnD[] => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{isMounted ? (
				<Droppable droppableId='droppable'>
					{provided => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{currentItems.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											{item.content}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			) : null}
		</DragDropContext>
	)
}
