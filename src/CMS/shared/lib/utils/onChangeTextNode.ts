import { updateDBHTML } from '@/shared/api/updateDBHTML'

const onChangeTextNode = async (id: number) => {
	const main = document.querySelector('main')
	const textEditorTags = document.querySelectorAll('text-editor')

	const textEditableElement = main
		? main.querySelector('[text-editable]')
		: null

	textEditorTags.forEach(textEditor => {
		textEditor.addEventListener('input', () => {
			let currentContentDOM = textEditableElement
				? textEditableElement.outerHTML
				: '<p className="text-center">not found text-editable</p>'
			updateDBHTML(id, currentContentDOM)
		})
	})
}

export { onChangeTextNode }