import React, { useContext, useEffect } from 'react'
import Context from '../../context'
import axios from 'axios'

import NotLogged from '../NotLogged/NotLogged'

export default function Payments() {
	const { isLogged, api } = useContext(Context)

	useEffect(() => {
		const instance2 = axios.create()
		instance2.interceptors.request.use(
			(config) => {
				// Код, необходимый до отправки запроса
				config.method = 'get'
				return config
			},
			(error) => {
				// Обработка ошибки из запроса
				return Promise.reject(error)
			}
		)

		function updatePayments() {
			if (isLogged) {
				instance2
					.get(`${api}pay/`, {
						method: 'get',
						withCredentials: true,
					})
					.then((response) => response.json())
					.then((data) => {
						console.log(data)
					})

				// fetch('http://192.168.0.200/pay/', {
				// 	headers: {
				// 		accept: 'application/json',
				// 	},
				// 	credentials: 'include',
				// })
				// 	.then((response) => response.json())
				// 	.then((data) => {
				// 		console.log(data)
				// 	})
			}
		}

		updatePayments()

		const interval = setInterval(updatePayments, 100000)

		return () => {
			clearInterval(interval)
		}
	}, [isLogged])

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="card-item">This is a Payments page!</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
