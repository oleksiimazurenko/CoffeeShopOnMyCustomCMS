import { CreatePage, DeletePage } from '@/features/cms'
import { Navbar } from '@/features/navbar'

export async function Header() {
	return (
		<header className='absolute top-0 left-1/2 transform -translate-x-1/2 py-[30px] w-full z-50'>
			<Navbar type='white' DeletePage={DeletePage} CreatePage={CreatePage}/>
		</header>
	)
}