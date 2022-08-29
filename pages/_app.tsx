import '../styles/globals.css'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '../models'
import { SWRConfig } from 'swr'
import axiosClient from '@/api/axios-client'
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout
	return (
		// shouldRetryOnError: false -> lúc nào fetch api faild thì fetch lại
		<SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	)
}
export default MyApp
