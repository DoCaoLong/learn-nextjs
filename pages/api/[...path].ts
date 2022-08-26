// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
import httpProxy from 'http-proxy'

export const config = {
	api: {
		// bodyParser trong trường hợp có sử dụng body: user -> req -> nextjs (mặc định parser body), nếu k muốn parser thì để false thì req đó đi thẳng lên server
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	// k thấy Response trả về nê dùng promise ( đợi api trả về)
	return new Promise((resolve) => {
		// convert cookies to header Authorization (Nếu có cookies thì thêm accessToken vào header)
		const cookies = new Cookies(req, res)
		const accessToken = cookies.get('access_token')
		if (accessToken) {
			req.headers.Authorization = `Bearer ${accessToken}`
		}

		// don't send cookies to API server
		req.headers.cookie = ''

		//proxy
		proxy.web(req, res, {
			// đường dẫn tới server https://js-post-api.herokuapp.com
			target: process.env.API_URL,
			// thay đổi mỗi https://js-post-api.herokuapp.com (origin)
			changeOrigin: true,
			// respons trả về thẳng client xử lý : false, ngược lại để true để next server handle
			selfHandleResponse: false,
		})

		// lắng nghe sự kiện nào có proxy trả về thì báo true
		proxy.once('proxyRes', () => {
			resolve(true)
		})
	})
}
