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
