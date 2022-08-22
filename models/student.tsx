import { LayoutProps } from '@/models/common'
import Link from 'next/link'
import * as React from 'react'

export function StudentLayout({ children }: LayoutProps) {
	return (
		<div>
			<h1>Student Layout</h1>
			<Link href="/">
				<a>Home</a>
			</Link>
			<Link href="/about">
				<a>About</a>
			</Link>
			<div>{children}</div>
		</div>
	)
}
