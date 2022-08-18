import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'

export interface IPostListPageProps {
	posts: any[]
}

export default function PostListPage({ posts }: IPostListPageProps) {
	// log ddc cả bên server và client
	// console.log('posts', posts)
	return (
		<>
			<h1>Post List Page</h1>
			<ul>
				{posts.map((item: any, index: number) => (
					<li key={index}>{item.title}</li>
				))}
			</ul>
		</>
	)
}

export interface IPostListPageProps {}

// đc gọi bên server, k gọi ở client
export const getStaticProps: GetStaticProps<IPostListPageProps> = async (
	context: GetStaticPropsContext
) => {
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
