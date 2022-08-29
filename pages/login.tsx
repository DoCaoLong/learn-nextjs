import { useRouter } from 'next/router'
import * as React from 'react'
import { useAuth } from '../hooks'

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
	const router = useRouter()
	const { profile, login, logout } = useAuth({
		revalidateOnMount: false, // k fetch api khi moi moutn
	})

	async function handleLoginClick() {
		try {
			await login()
			router.push('./about')
			console.log('redirect to dasboard')
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	async function handleLogoutClick() {
		try {
			await logout()
			console.log('redirect to login page')
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	return (
		<div>
			<h1>Login Page</h1>
			<h2>Profile: {JSON.stringify(profile || {}, null, 4)}</h2>
			<button onClick={handleLoginClick}>Login</button>
			<button onClick={handleLogoutClick}>Logout</button>
			<button onClick={() => router.push('./about')}>Go to about</button>
		</div>
	)
}
