import '../styles/globals.css'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '../models'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
export default MyApp
