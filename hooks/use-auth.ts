import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'
import { authApi } from '@/api/index'

export function useAuth(options?: Partial<PublicConfiguration>) {
	// quan ly profile bat cu cho nao can goi profile
	const {
		data: profile,
		error,
		mutate,
		isValidating,
	} = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000, // 1hr
		revalidateOnFocus: false, // qua tab khac quay lai k fetch data
		...options,
	})

	const firstLoading = profile === undefined && error === undefined

	async function login() {
		await authApi.login({
			username: 'test1',
			password: '123123',
		})
		await mutate() // doi co req thi mutate
	}

	async function logout() {
		await authApi.logout()
		mutate({}, false) // cho data rong va khong call api
	}

	return {
		profile,
		error,
		login,
		logout,
		firstLoading,
	}
}
