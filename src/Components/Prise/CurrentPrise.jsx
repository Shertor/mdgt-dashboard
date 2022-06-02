import React from 'react'

export default function CurrentPrise({ prise, date, chartLoaded }) {
	return (
		<>
			<div className="current-prise card-item">
				<div className="current-prise__title">Текущая премия</div>
				<div className="current-prise__prise">
					{chartLoaded ? prise + '%' : null}
				</div>
				<div className="current-prise__date">{date}</div>
			</div>
		</>
	)
}
