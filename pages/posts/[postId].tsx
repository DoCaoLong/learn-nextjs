import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'

export interface IPostPageProps {
	post: any
}

export default function PostDetailPage({ post }: IPostPageProps) {
	if (!post) return null
	return (
		<div>
			<h1>PostDetailPage</h1>
			<p>{post.title}</p>
			<p>{post.author}</p>
			<p>{post.description}</p>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	// console.log('get statis paths :>> ')
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
	const data = await response.json()
	return {
		// truyền vào paths bao nhiêu item thì nó sẽ truyền vào getStaticProps bấy nhiêu item để render file html
		paths: data.data.map((item: any) => ({ params: { postId: item.id } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<IPostPageProps> = async (
	context: GetStaticPropsContext
) => {
	// console.log('get static props :>> ', context.params?.postId)
	const postId = context.params?.postId
	if (!postId) return { notFound: true }
	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
	const data = await response.json()
	return {
		props: {
			post: data,
		},
	}
}
