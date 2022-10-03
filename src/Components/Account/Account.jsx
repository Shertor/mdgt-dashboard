import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context'
import axios from 'axios'

import './Account.css'

import DisplayCard from '../DisplayCard/DisplayCard'

import AccountChart from './AccountChart'
import AccountCharts from './AccountCharts'

export default function Account({ toSummary }) {
	const { isLogged, api, setLogged } = useContext(Context)

	const [payments, setPayments] = useState()
	const [generalPays, setGeneralPays] = useState({ prizes: [], dates: [] })
	const [paysLoaded, setPaysLoaded] = useState(false)

	const [currentDate, setCurrentDate] = useState(null)
	const [accountLoaded, setAccountLoaded] = useState(false)

	useEffect(() => {
		if (!isLogged) {
			setAccountLoaded(false)
			setPayments()
			setGeneralPays({ prizes: [], dates: [] })
			setPaysLoaded(false)
			return
		}

		const paymentsRequestor = axios.create()
		paymentsRequestor.interceptors.request.use(
			(config) => {
				// Код, необходимый до отправки запроса
				config.method = 'get'
				config.withCredentials = true
				return config
			},
			(error) => {
				// Обработка ошибки из запроса
				return Promise.reject(error)
			}
		)
		paymentsRequestor.interceptors.response.use(
			function(response) {
				return response
			},
			function(error) {
				// Do something with response error
				if (error.response.status === 401) {
					setLogged(false)
				}
				return { data: null }
			}
		)

		function updatePayments() {
			if (isLogged) {
				const options = { year: 'numeric', month: 'short' }
				const date = new Intl.DateTimeFormat('ru-RU', options)
					.format(new Date())
					.replace(' г.', '')
				setCurrentDate(date)
				paymentsRequestor
					.get(
						`${api}works/pay/?month=${new Date().getMonth()}&year=${new Date().getFullYear()}`
					)
					.then((response) => {
						if (response.status === 200) {
							console.log(response)
							const data = response.data
							if (data) {
								// const resultData = parsePayments(data)
								setPayments(data)
								setAccountLoaded(true)
							}
						}
					})
			}
		}

		updatePayments()

		const interval = setInterval(updatePayments, 100000)

		return () => {
			clearInterval(interval)
		}
	}, [isLogged])

	useEffect(() => {
		if (!isLogged) {
			setAccountLoaded(false)
			setPayments()
			setGeneralPays({ prizes: [], dates: [] })
			setPaysLoaded(false)
			return
		}

		const paymentsRequestor = axios.create()
		paymentsRequestor.interceptors.request.use(
			(config) => {
				// Код, необходимый до отправки запроса
				config.method = 'get'
				config.withCredentials = true
				return config
			},
			(error) => {
				// Обработка ошибки из запроса
				return Promise.reject(error)
			}
		)
		paymentsRequestor.interceptors.response.use(
			function(response) {
				return response
			},
			function(error) {
				// Do something with response error
				if (error.response.status === 401) {
					setLogged(false)
				}
				return { data: null }
			}
		)

		async function getGeneralPays() {
			const month = [6, 5, 4, 3, 2, 1, 0]
			const _generalPaysPrizes = []
			const _generalPaysDates = []

			for (const i of month) {
				const date = new Date()
				date.setMonth(date.getMonth() - i)
				await paymentsRequestor
					.get(
						`${api}works/pay/?month=${date.getMonth()}&year=${date.getFullYear()}`
					)
					.then((response) => {
						if (response.status === 200) {
							console.log(response)
							const data = response.data
							if (data) {
								// const resultData = parsePayments(data)
								_generalPaysPrizes.push(data.general)

								const options = { year: 'numeric', month: 'short' }
								const _date = new Intl.DateTimeFormat('ru-RU', options)
											.format(date)
											.replace(' г.', '')

								_generalPaysDates.push(_date)
							}
						}
					})
			}
			setGeneralPays({prizes: _generalPaysPrizes, dates: _generalPaysDates})
			setPaysLoaded(true)
		}

		getGeneralPays()
	}, [isLogged])


	return (
		<div className="account__wrapper">
			<div className="account__general-wrapper">
				<div className="account__general card-item">
					<h2>Пользователь</h2>
				</div>
				<div className="account__pays-wrapper">
					<DisplayCard
						title="База"
						prize={accountLoaded ? payments.general : 0}
						date={currentDate}
						chartLoaded={accountLoaded}
						closeBtn={false}
					/>
					<DisplayCard
						title="Протоколы"
						prize={accountLoaded ? payments.general : 0}
						date={currentDate}
						chartLoaded={accountLoaded}
						closeBtn={false}
					/>
					<DisplayCard
						title="Разработка"
						prize={accountLoaded ? payments.general : 0}
						date={currentDate}
						chartLoaded={accountLoaded}
						closeBtn={false}
					/>
					<DisplayCard
						title="Курсы"
						prize={accountLoaded ? payments.general : 0}
						date={currentDate}
						chartLoaded={accountLoaded}
						closeBtn={false}
					/>
				</div>
			</div>
			<div className="account-charts__wrapper">
				<div className="chart-card card-item">
					<h1 className="">Общие выплаты</h1>
					<div className="chart-card__chart">
						{paysLoaded ? (
							<AccountChart dataset={generalPays} />
						) : (
							<div className="blank-page-ar-2"></div>
						)}
					</div>
				</div>
				<div className="chart-card card-item">
					<h1 className="">Выплаты</h1>
					<div className="chart-card__chart">
						{/* {accountLoaded ? (
							<AccountCharts dataset={prizes} />
						) : (
							<div className="blank-page-ar-2"></div>
						)} */}
						<div className="blank-page-ar-2"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
