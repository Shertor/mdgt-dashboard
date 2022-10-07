import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import './WorkSubmitter.css'

import SearchBar from '../../SearchBar/SearchBar'

import Context from '../../../context'

export default function WorkSubmitter({ searchData, isMobileType }) {
	const { api, newShow, accountData, setNewShow, setTable } = useContext(
		Context
	)

	// Данные из заполняемых ячеек в таблице
	const [inputDate, setInputDate] = useState(new Date().toJSON().slice(0, 10))
	const [inputType, setInputType] = useState('')
	const [inputCategory, setInputCategory] = useState('')
	const [inputID, setInputID] = useState(-1)
	const [inputCount, setInputCount] = useState('')
	const [inputAdditional, setInputAdditional] = useState('')

	const [isError, setIsError] = useState(false)

	useEffect(() => {
		document
			.getElementById('search-bar-input-1')
			.addEventListener('change', (event) => {
				setInputType(event.target.value)
			})
	}, [])

	function clear() {
		setNewShow(false)
		setInputDate(new Date().toJSON().slice(0, 10))
		setInputType('')
		setInputCategory('')
		setInputID(-1)
		setInputCount('')
		setInputAdditional('')
	}
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

	return isMobileType ? null : (
		<>
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
						<SearchBar data={searchData} />
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
		</>
	)
}
