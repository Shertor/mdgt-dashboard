import React, { useState, useEffect, useContext } from 'react'

import axios from 'axios'

import './Table.css'

import SearchBar from '../SearchBar/SearchBar'
import Context from '../../context'

export default function Table({ searchData }) {
	const { api, accountData } = useContext(Context)

	const [newShow, setNewShow] = useState(false)

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


	useEffect(() => {
		document
			.getElementById('search-bar-input-1')
			.addEventListener('change', (event) => {
				setInputType(event.target.value)
			})
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
		<div className="card-item">
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
						<tr className="dynamic-table__row">
							<td>
								<div className="date">Окт. 2022</div>
							</td>
							<td>Протокол python</td>
							<td>Протоколы и ведомости</td>
							<td>42-22 НИИ ЧАВО</td>
							<td>9000</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
