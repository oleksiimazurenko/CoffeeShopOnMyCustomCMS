'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/ui/sheet'

import CreatePage from '@/CMS/features/createPage/ui/CreatePage'
import DeletePage from '@/CMS/features/deletePage/ui/DeletePage'
import { Separator } from '@/shared/ui/separator'
import { page } from '@prisma/client'
import { PencilRuler } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { contentEditableTrue } from '../shared/lib/utils/contentEditableTrue'
import { onChangeTextNode } from '../shared/lib/utils/onChangeTextNode'

export default function CMS({ pages }: { pages: page[] }) {
	const path = usePathname()

	useEffect(() => {
		contentEditableTrue()
	}, [path]) // делаем вcе текстовые ноды на странице в contentEditable = true

	useEffect(() => {
		onChangeTextNode(1)
	}, []) // Потому что под индексом один у нас главная страница в базе данных

	return (
		<Sheet>
			<SheetTrigger className='fixed bottom-0 left-0 p-[10px] border rounded-tr-lg border-green-50/0 bg-slate-800/10 hover:bg-yellow-300/40 transition-all duration-500'>
				<PencilRuler />
			</SheetTrigger>
			<SheetContent className='p-0 bg-gradient-to-r from-yellow-100/40 to-slate-200 '>
				<SheetHeader className='p-[10px]'>
					<SheetTitle className='text-center'>Change Site</SheetTitle>
					<SheetDescription className='text-center'>
						Here you can manage your site
					</SheetDescription>
				</SheetHeader>

				<Separator />

				<CreatePage />

				<Separator />

				<DeletePage pages={pages} />

				<Separator />
			</SheetContent>
		</Sheet>
	)
}
