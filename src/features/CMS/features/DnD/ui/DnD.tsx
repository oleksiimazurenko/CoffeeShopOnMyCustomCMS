'use client'

import { typeCurrentItemsDnD, useDnDStore, useTextContentStore } from '@/shared/stores/allDataStore'
import { useEffect } from 'react'
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd'
import { updateTextContent } from '../../../shared/api/updateTextContent'

export default function DnD({
	pageID,
	initialItems,
}: {
	pageID: number
	initialItems: typeCurrentItemsDnD[]
}) {
	const { currentItems, setDnDItems } = useDnDStore()
	const { currentTextContent } = useTextContentStore()

	useEffect(() => {
		// Установка начального состояния
		setDnDItems(initialItems)
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

		updateTextContent(pageID, currentTextContent)
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

	console.log(currentItems); 

	return (
		<DragDropContext onDragEnd={onDragEnd}>
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
		</DragDropContext>
	)
}
