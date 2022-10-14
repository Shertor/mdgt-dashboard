import React, { useState, useEffect, useContext } from 'react'

import axios from 'axios'

import './Table.css'

import WorkSubmitter from './WorkSubmitter/WorkSubmitter'
import Context from '../../context'
import useWindowDimensions from '../windowResizeHook'

export default function Table({ searchData }) {
	const { api, accountData, currentDate, setReloadData } = useContext(Context)

	const [mobile, setMobile] = useState(false)

	const { width } = useWindowDimensions()

	const [newShow, setNewShow] = useState(false)

	const [works, setWorks] = useState([])

	function setTable() {
		const tableRequestor = axios.create()
		tableRequestor.interceptors.request.use(
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
		tableRequestor.interceptors.response.use(
			function(response) {
				return response
			},
			function(error) {
				// Do something with response error
				if (error.response.status === 401) {
					console.log(error)
				}
				return { data: null }
			}
		)
		// [
		// 	{
		// 	  "id": 1,
		// 	  "date": "2022-10-06",
		// 	  "object_number": "111",
		// 	  "work_name": "Протокол python",
		// 	  "work_id": 1,
		// 	  "count": 1,
		// 	  "price": 30
		// 	}
		//   ]
		const _date = new Date()
		tableRequestor
			.get(
				`${api}works/?month=${_date.getMonth() + 1}&year=${_date.getFullYear()}`
			)
			.then((response) => {
				if (response.status === 200) {
					const data = response.data
					data.forEach((item) => {
						const _result = searchData.filter((i) => i.name === item.work_name)
						item['work_category'] = _result[0].position

						const options = { year: 'numeric', month: 'short', day: 'numeric' }
						const formatDate = new Intl.DateTimeFormat('ru-RU', options)
							.format(new Date(item.date))
							.replace(' г.', '')
						item.date = formatDate
					})
					setWorks(data)
				}
			})
	}

	useEffect(() => {
		setTable()
	}, [])

	useEffect(() => {
		if (width <= 1155) {
			if (!mobile) setMobile(true)
		} else {
			if (mobile) setMobile(false)
		}
	}, [width])

	return (
		<div className="card-item dynamic-table-item">
			<h1>{`Выполненные работы за ${currentDate}`}</h1>
			{mobile ? (
				<Context.Provider
					value={{
						api,
						accountData,
						newShow,
						setNewShow,
						setTable,
						setReloadData,
					}}
				>
					<WorkSubmitter
						searchData={searchData}
						isMobileType={true}
					></WorkSubmitter>
				</Context.Provider>
			) : null}
			<div className="dynamic-table__table-item">
				{mobile ? <h3>Таблица работ с прокруткой вправо</h3> : null}
				<div className="dynamic-table__wrapper">
					<table className="dynamic-table">
						<thead className="dynamic-table__head">
							<tr>
								<th className="date" scope="col">
									Дата
								</th>
								<th scope="col">Тип</th>
								<th scope="col">Категория</th>
								<th scope="col">Количество</th>
								<th scope="col">Дополнительно</th>
							</tr>
							{mobile ? null : (
								<tr
									className={
										newShow
											? 'dynamic-table__add-btn hidden'
											: 'dynamic-table__add-btn'
									}
									onClick={() => {
										setNewShow(!newShow)
									}}
								>
									<td>
										<div className="plus-icon">
											<svg width="13" height="13">
												<path
													d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
													fill="currentColor"
													fillRule="evenodd"
												></path>
											</svg>
										</div>
										Добавить запись
									</td>
								</tr>
							)}
						</thead>
						<tbody>
							<Context.Provider
								value={{
									api,
									accountData,
									newShow,
									setNewShow,
									setTable,
									setReloadData,
								}}
							>
								{mobile ? null : (
									<WorkSubmitter searchData={searchData}></WorkSubmitter>
								)}
							</Context.Provider>

							{works.map((item) => {
								return (
									<tr
										className="dynamic-table__row"
										key={`${item.date}_${item.object_number}_${item.id}`}
									>
										<td>
											<div className="date">{item.date}</div>
										</td>
										<td>{item.work_name}</td>
										<td>{item.work_category}</td>
										<td>{item.count}</td>
										<td>{item.object_number}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
