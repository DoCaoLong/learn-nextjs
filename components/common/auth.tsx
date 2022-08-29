import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IAuthProps {
	children: any
}

export function Auth({ children }: IAuthProps) {
	const { profile, firstLoading }: any = useAuth()
	const router = useRouter()
	React.useEffect(() => {
		if (!firstLoading && !profile?.username) router.push('./login')
	}, [firstLoading, profile, router])

	if (!profile?.username) return <h2>Loading ...</h2>

	return <div>{children}</div>
}
