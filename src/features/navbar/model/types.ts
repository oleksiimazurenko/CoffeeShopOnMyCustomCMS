import { Session } from 'next-auth'

export type navbarPropsType = {
	type: 'black' | 'white'

	DeletePage: (props: {
		id: number
		typePage: 'dynamic' | 'static' | 'not-iterable'
	}) => JSX.Element

	CreatePage: (props: {
		classNameTrigger?: string
		classNameContent?: string
	}) => JSX.Element

	LogIn?: (props: {
		
	}) => JSX.Element

	LogOut?: (props: {
		
	}) => JSX.Element
	
}
