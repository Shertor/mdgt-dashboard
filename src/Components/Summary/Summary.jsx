import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import DisplayCard from '../DisplayCard/DisplayCard'

import './Summary.css'

export default function Summary() {
	const { isLogged } = useContext(Context)

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="transparent-item summary-grid">
					<DisplayCard
						title="Текущая премия"
						prise={300}
						date={'07.2022'}
						chartLoaded={true}
						type={'good'}
						unit={'%'}
					/>
					<DisplayCard
						title="Отчеты"
						prise={14}
						chartLoaded={true}
						type={'bad'}
					/>
					<DisplayCard title="Выплата" prise={123} chartLoaded={true} />
				</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
