import React from 'react'
import { useState } from 'react'

import './Table.css'

import SearchBar from '../SearchBar/SearchBar'
import Context from '../../context'
import { useEffect } from 'react'

export default function Table({ searchData }) {
	const [newShow, setNewShow] = useState(false)

	// Данные из заполняемых ячеек в таблице
	const [inputDate, setInputDate] = useState(new Date())
	const [inputType, setInputType] = useState('')
	const [inputCategory, setInputCategory] = useState('')
	const [inputCount, setInputCount] = useState(null)
	const [inputAdditional, setInputAdditional] = useState('')

    useEffect(()=>{
        document.getElementById('search-bar-input-1').addEventListener('change',(event)=>{
            setInputType(event.target.value)
        })
    },[])

    useEffect(()=>{
        console.log(inputType);
    }, [inputType])

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
									? 'dynamic-table__row dynamic-table__add-row dynamic-table__add-row_show'
									: 'dynamic-table__row dynamic-table__add-row'
							}
						>
							<td>
								<input className="dynamic-table__input" type="date" />
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
								/>
							</td>
							<td>
								<input
									className="dynamic-table__input"
									type="number"
									placeholder="Количество"
								/>
							</td>
							<td>
								<input
									className="dynamic-table__input"
									type="text"
									placeholder="Номер объека и т.п...."
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
									<button className="dynamic-table__btn_submit">
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
