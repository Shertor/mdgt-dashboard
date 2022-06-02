import React from 'react'

export default function CurrentPrise({ prises, chartLoaded }) {
	return (
		<>
			<div className="current-prise card-item">
				<div className="current-prise__title">Текущая премия</div>
				<div className="current-prise__prise">
					{chartLoaded ? prises.prises[prises.prises.length - 1] + '%' : null}
				</div>
				<div className="current-prise__date">
					{prises.dates[prises.prises.length - 1]}
				</div>
			</div>
		</>
	)
}
