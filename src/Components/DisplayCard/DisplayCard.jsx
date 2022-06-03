import React from 'react'
import PropTypes from 'prop-types'

import './DisplayCard.css'

function DisplayCard({ title, prize, date, chartLoaded, type, unit }) {
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
			<div className="current-prize card-item">
				{title ? <div className="current-prize__title">{title}</div> : null}
				<div className={'current-prize__prize ' + colorClass}>
					{chartLoaded ? (
						<>
							{Math.round(prize)}
							<p id="not-int-unit-part">.35</p>
							<p>{unit ? unit : ''}</p>
						</>
					) : null}
				</div>
				<div className="current-prize__date">{date}</div>
			</div>
		</>
	)
}

DisplayCard.propTypes = {
	title: PropTypes.string,
	prize: PropTypes.number,
	date: PropTypes.string,
	chartLoaded: PropTypes.bool.isRequired,
	type: PropTypes.string,
	unit: PropTypes.string,
}

export default DisplayCard
