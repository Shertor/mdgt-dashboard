import React, { useState, useEffect, useContext } from 'react'

import axios from 'axios'

import './Table.css'

import SearchBar from '../SearchBar/SearchBar'
import Context from '../../context'

export default function Table({ searchData }) {
	const { api, accountData, currentDate } = useContext(Context)

	const [newShow, setNewShow] = useState(false)

	const [works, setWorks] = useState([])

	// Данные из заполняемых ячеек в таблице
	const [inputDate, setInputDate] = useState(new Date().toJSON().slice(0, 10))
	const [inputType, setInputType] = useState('')
	const [inputCategory, setInputCategory] = useState('')
	const [inputID, setInputID] = useState(-1)
	const [inputCount, setInputCount] = useState('')
	const [inputAdditional, setInputAdditional] = useState('')

	const [isError, setIsError] = useState(false)

	function clear() {
		setNewShow(false)
		setInputDate(new Date().toJSON().slice(0, 10))
		setInputType('')
		setInputCategory('')
		setInputID(-1)
		setInputCount('')
		setInputAdditional('')
	}

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

                        console.log(_result);

						console.log(item.date)
						const options = { year: 'numeric', month: 'short' }
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
		document
			.getElementById('search-bar-input-1')
			.addEventListener('change', (event) => {
				setInputType(event.target.value)
			})

		setTable()
	}, [])

	// useEffect(() => {
	// 	console.log(inputType)
	// }, [inputType])

	useEffect(() => {
		const _result = searchData.filter((item) => item.name === inputType)
		if (_result.length === 1) {
			setInputCategory(_result[0].position)
			setInputID(_result[0].id)
			return
		}
		setInputCategory('')
	}, [inputType])

	function onSubmitClick(event) {
		event.preventDefault()
		event.stopPropagation()

		const postNewData = axios.create()
		postNewData.interceptors.request.use(
			(config) => {
				// Код, необходимый до отправки запроса
				config.method = 'post'
				config.headers = { 'Content-Type': 'application/json' }
				config.withCredentials = true
				return config
			},
			(error) => {
				// Обработка ошибки из запроса
				return Promise.reject(error)
			}
		)
		postNewData.interceptors.response.use(
			function(response) {
				clear()
				setTable()
				return response
			},
			function(error) {
				// Do something with response error
				if (error.response.status === 401) {
					submitError('Ошибка при отправке данных')
				}
				return { data: null }
			}
		)

		const _result = searchData.filter((item) => item.name === inputType)

		if (_result.length !== 1) {
			submitError('Выберите тип отчета из списка')
			return
		}
		if (inputID < 0) {
			submitError('Проверьте корректность данных')
			return
		}
		if (
			inputDate === '' ||
			inputType === '' ||
			inputCount === '' ||
			inputAdditional === ''
		) {
			submitError('Пожалуйста, заполните все поля')
			return
		}

		// console.log(accountData);
		postNewData.post(`${api}works/`, {
			user_id: accountData.id,
			date: inputDate,
			object_number: inputAdditional,
			work_id: inputID,
			count: inputCount,
		})
	}

	function submitError(text) {
		console.log(text)
		setIsError(true)
		setTimeout(() => {
			setIsError(false)
		}, 1000)
	}

	const data = searchData

	return (
		<div className="card-item dynamic-table-item">
            <h1>{`Выполненные работы за ${currentDate}`}</h1>
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
					</thead>
					<tbody>
						<tr
							className={
								newShow
									? `dynamic-table__row dynamic-table__add-row dynamic-table__add-row_show ${
											isError ? 'error' : ''
									  }`
									: 'dynamic-table__row dynamic-table__add-row'
							}
						>
							<td>
								<input
									className="dynamic-table__input"
									type="date"
									value={inputDate}
									onChange={(event) => setInputDate(event.target.value)}
								/>
							</td>
							<td>
								<Context.Provider value={{ setInputType }}>
									<SearchBar data={data} />
								</Context.Provider>
							</td>
							<td>
								<input
									className="dynamic-table__input"
									disabled={true}
									type="text"
									placeholder="Автоматически"
									value={inputCategory}
								/>
							</td>
							<td>
								<input
									className="dynamic-table__input"
									type="number"
									placeholder="Количество"
									value={inputCount}
									onChange={(event) => setInputCount(event.target.value)}
								/>
							</td>
							<td>
								<input
									className="dynamic-table__input"
									type="text"
									placeholder="Номер объека и т.п...."
									value={inputAdditional}
									onChange={(event) => setInputAdditional(event.target.value)}
								/>
							</td>
						</tr>
						<tr
							className={
								newShow
									? 'dynamic-table__row dynamic-table__add-row dynamic-table__add-row_bottom dynamic-table__add-row_show'
									: 'dynamic-table__row dynamic-table__add-row'
							}
						>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<div className="dynamic-table__btns">
									<button
										className="dynamic-table__btn_cancel"
										onClick={() => {
											setNewShow(false)
										}}
									>
										Отмена
									</button>
									<button
										className="dynamic-table__btn_submit"
										onClick={onSubmitClick}
									>
										Сохранить
									</button>
								</div>
							</td>
						</tr>

						{works.map((item) => {
							return (
								<tr
									className="dynamic-table__row"
									key={`${item.date}_${item.object_number}`}
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
	)
}
