import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IPostDetailPageProps {}

export default function PostDetailPage(props: IPostDetailPageProps) {
	const router = useRouter()
	return (
		<div>
			<h1>PostDetailPage</h1>
			<p>Query:{JSON.stringify(router.query)}</p>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	console.log('get statis paths :>> ')
	return {
		paths: [
			{ params: { postId: '1' } },
			{ params: { postId: '2' } },
			{ params: { postId: '3' } },
			{ params: { postId: '4' } },
		],
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<IPostDetailPageProps> = async (
	context: GetStaticPropsContext
) => {
	console.log('get statis props :>> ', context.params?.postId)

	// server-side
	// build-time
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
	const data = await response.json()
	// console.log('data :>> ', data)
	return {
		props: {
			posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
		},
	}
}
