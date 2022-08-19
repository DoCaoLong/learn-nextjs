import { useRouter } from 'next/router'
import * as React from 'react'

export interface IParamsPageProps {}

export default function ParamsPage(props: IParamsPageProps) {
	const router = useRouter()
	return (
		<div>
			<div>
				<h1>Params Page</h1>
				<p>Query: {JSON.stringify(router.query)}</p>
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	await new Promise((resolve) => setTimeout(resolve, 3000))

	return {
		props: {},
	}
}
