import Navbar from '@/features/navbar/ui/Navbar'

export default async function Header() {

	return (
		<header className='absolute top-0 left-1/2 transform -translate-x-1/2 py-[30px] w-full'>
			<Navbar type='white'/>
		</header>
	)
}
