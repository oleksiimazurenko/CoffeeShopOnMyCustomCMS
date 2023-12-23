const extraContentEditableTrue = (selector: string) => {
	// Эта функция для конкретного элемента с текстовой нодой для которой мы создадим пользовательский тег и зададим ему contentEditable
	const parentElement = document.querySelector(`[${selector}]`)
	const childElement = parentElement?.childNodes[0]

	if (parentElement && childElement) {
		const wrapper = document.createElement('text-editor')
		parentElement.replaceChild(wrapper, childElement)
		wrapper.appendChild(childElement)
		wrapper.contentEditable = 'true'
	}
}

export { extraContentEditableTrue }