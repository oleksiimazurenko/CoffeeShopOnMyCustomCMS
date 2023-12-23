import { create } from 'zustand'

type menuItemType = {
  id: number
  name: string
  src: string
}

type storeType = {
  menuItems: menuItemType[]
  setMenuItems: (items: menuItemType[]) => void
}

const useBearStore = create<storeType>((set) => ({
  menuItems: [],
  setMenuItems: (items) => set({ menuItems: items})
}))