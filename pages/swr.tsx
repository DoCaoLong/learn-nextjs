import { StudentDetail } from '@/components/swr'
import * as React from 'react'

export interface ISWRPageProps {}

export default function SWRPage(props: ISWRPageProps) {
	const [detailList, setDetailList] = React.useState([1, 1, 1])
	function handleAddClick() {
		setDetailList((prevList) => [...prevList, 1])
	}
	return (
		<div>
			<h1>SWR Page</h1>

			<button onClick={handleAddClick}>Add Detail</button>

			<ul>
				{detailList.map((item: any, index: number) => (
					<li key={index}>
						<StudentDetail studentId="sktwi1cgkkuif36f4" />
					</li>
				))}
			</ul>
		</div>
	)
}
