import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { create } from 'zustand'

//-----------------------------------------------------------------------------------------------------------------------

export type typeCurrentItemsDnD = {
	id: string
	content: JSX.Element | ReactNode | string
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

// export type typeTextContentStore = {
// 	currentTextContent: string
// 	setTextContent: (items: string) => void
// }

// export const useTextContentStore = create<typeTextContentStore>(set => ({
// 	currentTextContent: '',
// 	setTextContent: items => set({ currentTextContent: items })
// }))

//-----------------------------------------------------------------------------------------------------------------------

// export type typeSessionStore = {
// 	session: Session | null
// 	setSession: (session: Session | null) => void
// }

// export const useSessionStore = create<typeSessionStore>(set => ({
// 	session: null,
// 	setSession: session => set({ session: session })
// })) 