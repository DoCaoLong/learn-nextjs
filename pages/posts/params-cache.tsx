import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IParamsCacheProps {
	query: any
	post: any
}

export default function ParamsCache({ query, post }: IParamsCacheProps) {
	console.log('query', query)
	const router = useRouter()
	const [seconds, setSeconds] = React.useState()

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((x: any) => {
				if (x > 60) clearInterval(intervalId)
				return x + 1
			})
		}, 1000)
		return () => clearInterval(intervalId)
	}, [])
	return (
		<div>
			<h1>Params Cache</h1>
			<p>Time: {seconds}s</p>
			<h2>Post detail</h2>
			<p>{post?.title}</p>
			<p>{post?.author}</p>
			<p>{post?.description}</p>
		</div>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', 's-maxage=5')
	await new Promise((resolve) => setTimeout(resolve, 3000))
	const postId = context.query.postId
	if (!postId) return { props: { query: context.query } }
	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${postId}`)
	const data = await response.json()
	return {
		props: {
			query: context.query,
			post: data,
		},
	}
}
