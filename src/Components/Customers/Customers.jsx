import React, { useContext, useState, useEffect } from 'react'

import './Customers.css'

import Context from '../../context'
import NotLogged from '../NotLogged/NotLogged'

import Loader from '../Loader/Loader'
import { element } from 'prop-types'

export default function Customers() {
	const { isLogged, api } = useContext(Context)
	const [customers, setCustomers] = useState([{}])

	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (!isLogged) {
			setLoaded(false)
			setCustomers([{}])
			return
		}

		function updateCustomers() {
			if (isLogged) {
				fetch(`${api}prizes/`)
					.then((response) => response.json())
					.then((data) => {
						setTimeout(() => {
							const resultData = [
								{
									full_name: 'Смирнова Ирина Сергеевна',
									phone_number: 79091112232,
									email: 'example2@mail.ru',
									birthday: '1994-06-04',
									organization: 'Мосводоканал',
									level: 'middle',
								},
							]
							setCustomers(resultData)
							setLoaded(true)
						}, 5000)
					})
			}
		}

		updateCustomers()
	}, [isLogged])

	return (
		<>
			<React.Fragment>
				{isLogged ? (
					<div className="card-item customers-item">
						{loaded ? (
							customers.map((customer) => customer.full_name)
						) : (
							<Loader />
						)}
					</div>
				) : (
					<NotLogged />
				)}
			</React.Fragment>
		</>
	)
}
