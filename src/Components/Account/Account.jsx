import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context'
import axios from 'axios'

import './Account.css'

import DisplayCard from '../DisplayCard/DisplayCard'

import AccountChart from './AccountChart'
import AccountCharts from './AccountCharts'
import NotLogged from '../NotLogged/NotLogged'
import Table from '../Table/Table'

export default function Account({ toSummary }) {
	const { isLogged, api, setLogged, userName } = useContext(Context)

	const [payments, setPayments] = useState()
	const [generalPays, setGeneralPays] = useState({ prizes: [], dates: [] })
	const [accountData, setAccountData] = useState({})
	const [accountLoaded, setAccountLoaded] = useState(false)

	const [workTypes, setWorkTypes] = useState([])
	const [tableLoaded, setTableLoaded] = useState(false)


	const [reports, setReports] = useState({ reports: [], dates: [] })
	const [paysLoaded, setPaysLoaded] = useState(false)

	const [currentDate, setCurrentDate] = useState(null)

	/*
		Запрос и заполнение данных пользователя и выплат за текущий месяц
	*/
	useEffect(() => {
		if (!isLogged) {
			setAccountLoaded(false)
			setPayments()
			setGeneralPays({ prizes: [], dates: [] })
			setWorkTypes([])
			setAccountData({})
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
							const data = response.data
							if (data) {
								// const resultData = parsePayments(data)
								setPayments(data)
								setAccountLoaded(true)
							}
						}
					})
					.then(() => {
						paymentsRequestor
							.get(`${api}staff/${userName}`)
							.then((response) => {
								if (response.status === 200) {
									console.log(response.data[0])
									setAccountData(response.data[0])
								}
							})
					})
			}
		}

		updatePayments()

		const interval = setInterval(updatePayments, 100000)

		return () => {
			clearInterval(interval)
		}
	}, [isLogged])

	/*
		Запрос и заполнение графиков по выплатам и отчетам
	*/
	useEffect(() => {
		if (!isLogged) {
			setAccountLoaded(false)
			setPayments()
			setGeneralPays({ prizes: [], dates: [] })
			setPaysLoaded(false)
			setReports({ reports: [], dates: [] })
			setTableLoaded(false)
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
			const _generalReports = []
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
							const data = response.data

							console.log(data)

							if (data) {
								// const resultData = parsePayments(data)
								_generalPaysPrizes.push(data.general)
								_generalReports.push({
									courses:
										Object.keys(data.courses).length === 0 ? 0 : data.courses,
									developer: data.developer,
									reports:
										Object.keys(data.reports).length === 0 ? 0 : data.reports,
								})

								const options = { year: 'numeric', month: 'short' }
								const _date = new Intl.DateTimeFormat('ru-RU', options)
									.format(date)
									.replace(' г.', '')

								_generalPaysDates.push(_date)
							}
						}
					})
			}
			setGeneralPays({ prizes: _generalPaysPrizes, dates: _generalPaysDates })
			setReports({ reports: _generalReports, dates: _generalPaysDates })
		}

		getGeneralPays().then(() => {
			setPaysLoaded(true)
		})
	}, [isLogged])

	useEffect(() => {
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

		paymentsRequestor.get(`${api}works/work-types`).then((response) => {
			const _workTypes = []
			if (response.status === 200) {
				const data = response.data
				data.forEach((item) => {
					_workTypes.push({ name: item.work_name, position: item.category, id: item.id })
				})
			}
			setWorkTypes(_workTypes)
		}).then(()=>{
			setTableLoaded(true)
		})
	}, [isLogged])

	const linesNames = {
		courses: { title: 'Курсы', color: 'hsl(221, 24%, 32%)' },
		developer: { title: 'Разработка', color: '#3D84A8' },
		reports: { title: 'Отчеты', color: '#46CDCF' },
	}

	return isLogged ? (
		<div className="account__wrapper">
			<div className="account__general-wrapper">
				<div className="account__general card-item">
					<h2>Пользователь</h2>
					<div>{accountData.full_name}</div>
					<div>{accountData.rate}</div>
					<div>{accountData.calculation_percent}</div>
					<div>{accountData.developer_percent}</div>
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
						prize={
							accountLoaded
								? Object.keys(payments.reports).length === 0
									? 0
									: payments.reports
								: 0
						}
						date={currentDate}
						chartLoaded={accountLoaded}
						closeBtn={false}
					/>
					<DisplayCard
						title="Разработка"
						prize={accountLoaded ? payments.developer : 0}
						date={currentDate}
						chartLoaded={accountLoaded}
						closeBtn={false}
					/>
					<DisplayCard
						title="Курсы"
						prize={
							accountLoaded
								? Object.keys(payments.courses).length === 0
									? 0
									: payments.courses
								: 0
						}
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
						{paysLoaded ? (
							<AccountCharts
								dataset={reports}
								linesNames={linesNames}
								reportsKeys={['courses', 'developer', 'reports']}
							/>
						) : (
							<div className="blank-page-ar-2"></div>
						)}
					</div>
				</div>
			</div>
			{tableLoaded ? (
				<Table searchData={workTypes} />
			) : (
				<div className="blank-page-ar-2"></div>
			)}
		</div>
	) : (
		<NotLogged />
	)
}
