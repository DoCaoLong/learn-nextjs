import axiosClient from '@/api/axios-client'
import * as React from 'react'
import useSWR from 'swr'
export interface IStudentDetailProps {
	studentId: any
}

const MILLISECOND_PER_HOUR = 60 * 60 * 1000

export function StudentDetail({ studentId }: IStudentDetailProps) {
	// const {} = useSWR(`ABCD`, () => axiosClient.get(`students/${studentId}`))
	// Trường hợp k truyền vào 1 đường dẫn api url thì cần truyền fetcher

	// sử dụng nhiều nơi nhiều chỗ nhưng chỉ trigger 1 api duy nhất trong khoải thời gian dedupingInterval default 2s
	// Trường hợp truyền vào 1 đường dẫn api url thì k cần truyền fetcher, nó sẽ sử dụng default fetcher đc định nghĩa ở file _app.tsx
	const { data, error, mutate, isValidating } = useSWR(`students/${studentId}`, {
		revalidateOnFocus: false, // k fetch lại api khi chuyển tab khác r quay lại
		dedupingInterval: MILLISECOND_PER_HOUR, // default 2s, trong 2s đó user request nhưng k fetch data, sau 2s thì fetch data mới
	})
	function handleMutateClick() {
		// mutate: true tạm thời set local data cho tất cả những nơi sử dụng hook SWR, âm thầm fetch data mới bên dưới nào có data mới thì cập nhật lại data
		// mutate: false -> thay thành data mutate
		// dùng update / edit form
		mutate(
			{
				name: 'LongDC',
			},
			true
		)
	}
	return (
		<div>
			Name: {data?.name || '--'} <button onClick={handleMutateClick}>mutate</button>
		</div>
	)
}
