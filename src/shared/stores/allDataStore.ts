import { create } from 'zustand'

//-----------------------------------------------------------------------------------------------------------------------

export type typeCurrentItemsDnD = {
	id: string
	content: JSX.Element | string
}

export type typeStoreDnD = {
	currentItems: typeCurrentItemsDnD[]
	setDnDItems: (items: typeCurrentItemsDnD[]) => void
}

export const useDnDStore = create<typeStoreDnD>(set => ({
	currentItems: [],
	setDnDItems: items => set({ currentItems: items })
})) 

//-----------------------------------------------------------------------------------------------------------------------

export type typeTextContentStore = {
	currentTextContent: string
	setTextContent: (items: string) => void
}

export const useTextContentStore = create<typeTextContentStore>(set => ({
	currentTextContent: '',
	setTextContent: items => set({ currentTextContent: items })
})) 