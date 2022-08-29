// tsrpfc: export k có defautl
import { useAuth } from '@/hooks/use-auth'
import { LayoutProps } from '@/models/common'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Auth } from '../common'

export interface IAdminLayoutProps {}
export function AdminLayout({ children }: LayoutProps) {
	const { logout, profile } = useAuth()
	const router = useRouter()
	async function handleLogoutClick() {
		try {
			await logout()
			router.push('./login')
			console.log('redirect to login page')
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	return (
		<Auth>
			<h1>Admin Layout</h1>
			<div>Side bar</div>

			<button onClick={handleLogoutClick}>Logout</button>

			<p>Profile: {JSON.stringify(profile)}</p>

			<Link href="/">
				<a>Home</a>
			</Link>

			<Link href="/about">
				<a>About</a>
			</Link>

			<div>{children}</div>
		</Auth>
	)
}
