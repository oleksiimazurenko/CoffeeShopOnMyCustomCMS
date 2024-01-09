'use client'
import { Button } from '@/shared/ui/button'
import { signOut } from 'next-auth/react'


export function LogOut() {
	return (
		<Button onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>logOut</Button>
	)
}