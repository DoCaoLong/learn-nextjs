import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { AdminLayout, MainLayout } from '@/components/layout'
import { Typography } from '@mui/material'
// import Header from '@/components/common/header'
export interface IAboutPageProps {}
// ssr: false (render phía client k render phía server, Ngược lại thì k dùng là true)
const Header = dynamic(() => import('@/components/common/header'), { ssr: false })
export default function AboutPage(props: IAboutPageProps) {
	const [postList, setPostList] = useState([])
	const router = useRouter()
	const page = router.query?.page
	const handleNextClick = () => {
		router.push(
			{
				pathname: '/about',
				query: {
					page: Number(page || 1) + 1,
				},
			},
			undefined,
			//shallow router: true >> Chỉ chạy ở client k chạy ở server
			{ shallow: true }
		)
	}
	const handleBackClick = () => {
		router.push(
			{
				pathname: '/about',
				query: {
					page: Number(page) > 1 ? Number(page || 1) - 1 : 1,
				},
			},
			undefined,
			//shallow router: true >> Chỉ chạy ở client k chạy ở server
			{ shallow: true }
		)
	}
	// Muốn fetching data bên client và mockup html từ server thì dùng useEffect ở client
	React.useEffect(() => {
		if (!page) return
		;(async () => {
			const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
			const data = await response.json()
			setPostList(data?.data)
		})()
	}, [page])

	return (
		<Box>
			<Typography component="h1" variant="h3" color="primary.main">
				About Page
			</Typography>
			<Header />
			<ul className="post-list">
				{postList.map((item: any, index: number) => (
					<li key={index}>{item?.title}</li>
				))}
			</ul>
			<button onClick={() => handleBackClick()}>Back Page</button>
			<button onClick={() => handleNextClick()}>Next Page</button>
		</Box>
	)
}

AboutPage.Layout = AdminLayout

export async function getStaticProps() {
	return {
		props: {},
	}
}
