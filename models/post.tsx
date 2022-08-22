import { LayoutProps } from '@/models/common'
import Link from 'next/link'
import * as React from 'react'

export interface IAdminLayoutProps {}

export function PostLayout({ children }: LayoutProps) {
	return (
		<div>
			<h1>Post Layout</h1>
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
