import React from 'react'
import PropTypes from 'prop-types'

import './DisplayCard.css'

function DisplayCard({ title, prise, date, chartLoaded, type, unit }) {
	const colors = { good: 'good', bad: 'bad', neutral: '' }
	let colorClass = ''

	if (!date) {
		date = ' '
	}

	if (Object.keys(colors).includes(type)) {
		colorClass = colors[type]
		console.log(colorClass)
	}

	return (
		<>
			<div className="current-prise card-item">
				{title ? <div className="current-prise__title">{title}</div> : null}
				<div className={'current-prise__prise ' + colorClass}>
					{chartLoaded ? prise + (unit ? unit : '') : null}
				</div>
				<div className="current-prise__date">{date}</div>
			</div>
		</>
	)
}

DisplayCard.propTypes = {
	title: PropTypes.string,
	prise: PropTypes.number,
	date: PropTypes.string,
	chartLoaded: PropTypes.bool.isRequired,
	type: PropTypes.string,
	unit: PropTypes.string,
}

export default DisplayCard
