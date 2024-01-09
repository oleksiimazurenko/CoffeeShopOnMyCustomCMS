'use client'

import { Button, ButtonProps } from '@/shared/ui/button'
import React from 'react'

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, ...props }, ref) => {
		return (
			<Button
				className={`mt-4 border-2 border-white border-opacity-50 rounded-sm bg-transparent shadow-md px-10 py-2 text-[14px] font-bold text-slate-50 hover:bg-slate-50 hover:text-slate-800 ${className}`}
				{...props}
				ref={ref}
			>
				{children}
			</Button>
		)
	}
)
PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }