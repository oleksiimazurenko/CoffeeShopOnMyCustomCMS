// import { updateTextContent } from '@/features/CMS/shared/api/updateTextContent'
// import { typeCurrentItemsDnD, useDnDStore, useTextContentStore } from '@/shared/stores/allDataStore'

// const onChangeTextNode = async (slug: string) => {
// 	const { setTextContent } = useTextContentStore()
// 	const main = document.querySelector('main')

// 	const textEditableElements = main
// 		? main.querySelectorAll('[text-content-structure]')
// 		: null

// 	if (textEditableElements && textEditableElements?.length > 0) {
// 		textEditableElements.forEach(item => {
// 			const textEditorTags = item.querySelectorAll('text-editor')

// 			textEditorTags.forEach(textEditor => {
// 				textEditor.addEventListener('input', () => {
// 					const { currentItems } = useDnDStore()

// 					const textEditableElements = main
// 						? main.querySelectorAll('[text-content-structure]')
// 						: null

// 					if (textEditableElements) {
// 						const textArray = Array.from(textEditableElements).map(element => {
// 							// Клонирование элемента
// 							const clonedElement = element.cloneNode(true) as HTMLElement

// 							// Найти и заменить дочерний элемент в клонированном элементе
// 							const childToReplace = clonedElement.querySelector(
// 								'[iterable-structure]'
// 							)
// 							if (childToReplace) {
// 								const textNode = document.createTextNode(
// 									'##UNIQUE_ITERABLE_CONTENT##'
// 								)
// 								childToReplace.replaceWith(textNode)
// 							}

// 							// Возвращаем внешний HTML клонированного (и измененного) элемента
// 							return clonedElement.outerHTML
// 						})

// 						const resultDataSection: typeCurrentItemsDnD[] = currentItems.map(
// 							({ id }, i) => ({
// 								id,
// 								content: textArray[i],
// 							})
// 						)

// 						// const combinedString = resultDataSection.map(item => JSON.stringify(item)).join('##UNIQUE_DIVIDER##')

// 						const combinedString = resultDataSection.map(item => {
// 							try {
// 								return JSON.stringify(item);
// 							} catch (error) {
// 								console.error('Ошибка при формировании JSON строки:', error, item);
// 								return '';
// 							}
// 						}).join('##UNIQUE_DIVIDER##');
						
// 						// Проверка перед отправкой
// 						console.log('Отправляемая строка:', combinedString);

// 						setTextContent(combinedString) // Добавляем актуальные данные в Store (Zustand)

// 						updateTextContent(slug, combinedString) // Отправляем данные на сервер
// 					}
// 				})
// 			})
// 		})
// 	}
// }

// export { onChangeTextNode }