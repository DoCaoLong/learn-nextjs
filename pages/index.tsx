import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	const router = useRouter()
	const gotoDetailPage = () => {
		// router.push({
		// 	pathname: '/posts/[postsId]',
		// 	query: {
		// 		postsId: 123,
		// 		ref: 'social',
		// 	},
		// })
	}
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

				<p className={styles.description}>
					Get started by editing <code className={styles.code}>pages/index.tsx</code>
				</p>

				<Link href="/posts">
					<a>Goto Posts</a>
				</Link>

				{/* <button onClick={gotoDetailPage}>Go to post Detail page</button> */}
			</main>
		</div>
	)
}

export default Home
