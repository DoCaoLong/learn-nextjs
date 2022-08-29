// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'
type Data = {
	message: string
}
export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method not supported' })
	}

	return new Promise((resolve) => {
		req.headers.cookie = ''

		// handle res từ api trả về
		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = ''
			// get data
			proxyRes.on('data', function (chunk) {
				body += chunk
				console.log('chunk :>> ', chunk)
			})
			// đã get xong
			proxyRes.on('end', function () {
				try {
					const a = JSON.parse(body)
					console.log('a :>> ', a)
					const { accessToken, expiredAt } = JSON.parse(body)
					console.log({ accessToken, expiredAt })
					// console.log('res from proxid server:', body)

					// convert token to cookies (chỉ hoạt động ở env production)
					const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
					cookies.set('access_token', accessToken, {
						httpOnly: true,
						sameSite: 'lax',
						expires: new Date(expiredAt),
					})

					// trả về thông báo
					// res.end('my response to cli')
					// custom status và thông báo
					;(res as NextApiResponse).status(200).json({ message: 'Login successfully' })
				} catch (error) {
					;(res as NextApiResponse).status(500).json({ message: 'Something went wrong' })
				}

				// sau khi xử lý xong res từ api trả về thì báo true
				resolve(true)
			})
		}

		proxy.once('proxyRes', handleLoginResponse)

		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			// muốn tự handle res api trả về nên để true (nhận token từ api -> cookie cho client)
			selfHandleResponse: true,
		})
	})
}
