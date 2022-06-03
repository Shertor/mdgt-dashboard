import React, { useContext, useEffect } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'

export default function Payments() {
	const { isLogged } = useContext(Context)

	useEffect(() => {
		function updatePayments() {
			if (isLogged) {
				fetch('http://192.168.0.200/pay/', {
					headers: {
						accept: 'application/json',
					},
					credentials: 'include',
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data)
					})
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
