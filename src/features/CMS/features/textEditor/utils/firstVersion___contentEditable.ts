// const contentEditable = () => {
// 	// Эта функция для текстовых нод, для которых мы создадим пользовательский тег text-editor и зададим ему contentEditable
// 	const main = document.querySelector('main')
// 	let textNodes: Text[] = []
// 	const recursy = (element: Node) => {
// 		element?.childNodes.forEach((node: Node) => {
// 			let isEmpty =
// 				!node.nodeValue || node.nodeValue.replace(/\s+/g, '').length === 0

// 			if (node.nodeName === '#text' && !isEmpty) {
// 				textNodes.push(node as Text)
// 			} else if (node.nodeType === Node.ELEMENT_NODE) {
// 				// Проверяем, не содержит ли элемент атрибут no-editable
// 				if (!(node as Element).hasAttribute('product-card-structure')) {
// 					recursy(node) // Рекурсивно обрабатываем дочерние узлы
// 				}
// 			}
// 		})
// 	}

// 	if (main) recursy(main)

// 	if (textNodes.length > 0) {
// 		textNodes.forEach((node, i) => {
// 			let parentNode = node.parentNode
// 			if (parentNode && parentNode.nodeName.toLowerCase() !== 'text-editor') {
// 				const wrapper = document.createElement('text-editor')
// 				node.parentNode?.replaceChild(wrapper, node)
// 				wrapper.appendChild(node)
// 				wrapper.contentEditable = 'true'
// 			}
// 		})
// 	}
// }

// export { contentEditable }