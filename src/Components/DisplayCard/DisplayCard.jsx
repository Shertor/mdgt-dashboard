import React from 'react'
import PropTypes from 'prop-types'

import './DisplayCard.css'

function DisplayCard({ title, prise, date, chartLoaded }) {
	return (
		<>
			<div className="current-prise card-item">
				{title ? <div className="current-prise__title">{title}</div> : null}
				<div className="current-prise__prise">
					{chartLoaded ? prise + '%' : null}
				</div>
				{date ? <div className="current-prise__date">{date}</div> : null}
			</div>
		</>
	)
}

DisplayCard.propTypes = {
	title: PropTypes.string,
	prise: PropTypes.number,
	date: PropTypes.string,
	chartLoaded: PropTypes.bool.isRequired,
}

export default DisplayCard
