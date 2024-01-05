'use client'

import { useIsAuthorizedStore } from '@/shared/store/store'
import { Button } from '@/shared/ui/button'

export function PrimaryButton({
	className,
	children,
}: {
	className: string
	children: React.ReactNode
}) {
	const { isAuthorized } = useIsAuthorizedStore()

	return <Button onClick={() => {
		if(isAuthorized){

		}else{
			
		}
	}} className={className}>{children}</Button>
}
