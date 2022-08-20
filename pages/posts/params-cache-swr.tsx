import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IparamsCacheSwr {
	query: any
	post: any
}

export default function ParamsCacheSwr({ query, post }: IparamsCacheSwr) {
	const router = useRouter()
	const [seconds, setSeconds] = React.useState(0)

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
			<h1>Params Caches-cache-swr</h1>
			<p>Time: {seconds}s</p>
			<h2>Post detail</h2>
			<p>{post?.title}</p>
			<p>{post?.author}</p>
			<p>{post?.description}</p>
		</div>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//  - s-maxage=5
	// 	- user (nhiều user gửi cùng lúc) gửi request (call getServerSideProps() and cache in CDN trong 5s). trong 5s đó Server trả về data đã cache (user gửi lên server trả về trong 5s đó). Sau 5s đó user gửi lại resques -> server lại cache in CDN trong 5s tiếp ...
	// - nếu thay đổi data trong 5s cache đó thì server trả về vẫn data cũ, sau 5s đó user gửi request lại thì mới cập nhật lại data mới

	context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
	await new Promise((res) => setTimeout(res, 3000))
	const postId = context.query?.postId
	if (!postId) return { props: { query: context.query } }
	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
	const data = await response.json()
	return {
		props: {
			query: context.query,
			post: data,
		},
	}
}
