import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../models'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">LongDC!</a>
				</h1>
				<br />
				<Link href="/posts">
					<a>Goto Posts</a>
				</Link>
				<br />
				<Link href="/about?page=1">
					<a>Goto About</a>
				</Link>
				<br />
				<Link href="/posts/params-cache?postId=sktwi1cgkkuif36dj">
					<a>Goto Params-cache</a>
				</Link>
				<br />
				<Link href="/posts/params-cache-swr?postId=sktwi1cgkkuif36dj">
					<a>Goto Params-cache-swr</a>
				</Link>
				<br />
				<Link href="/posts/params-cache-swr5?postId=sktwi1cgkkuif36dj">
					<a>Goto Params-cache-swr5</a>
				</Link>
				{/* <button onClick={gotoDetailPage}>Go to post Detail page</button> */}
			</main>
		</div>
	)
}

Home.Layout = MainLayout

export default Home
