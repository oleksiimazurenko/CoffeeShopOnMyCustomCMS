const takeTextContentStructure = (
	setTextContent: (items: string) => void
): string => {
	const main = document.querySelector('main')

	const textContentStructureElements = main
		? main.querySelectorAll('[text-content-structure]')
		: null

	if (textContentStructureElements) {
		const textArray = Array.from(textContentStructureElements).map(element => {
			// Клонирование элемента
			const clonedElement = element.cloneNode(true) as HTMLElement

			// Найти и заменить дочерний элемент в клонированном элементе
			const childToReplace = clonedElement.querySelector('[iterable-structure]')
			if (childToReplace) {
				childToReplace.textContent = '##UNIQUE_ITERABLE_CONTENT##';
			}

			// Возвращаем внешний HTML клонированного (и измененного) элемента
			return clonedElement.outerHTML
		})

		const combinedString = textArray.join('##UNIQUE_DIVIDER##')

		// Проверка перед return
		// console.log(
		// 	'Сформированная строка перед возвращением из функции:',
		// 	combinedString
		// )

		setTextContent(combinedString) // Добавляем актуальные данные в Store (Zustand)

		return combinedString
	}

	return 'Elements with the [text-content-structure] attribute were not found'
}

export { takeTextContentStructure }