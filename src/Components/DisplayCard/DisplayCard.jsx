import React from 'react'
import PropTypes from 'prop-types'

import './DisplayCard.css'
import { useState } from 'react'

function DisplayCard({
	title,
	prize,
	date,
	chartLoaded,
	type,
	unit,
	closeBtn,
}) {
	const [visible, setVisible] = useState(true)

	function onCloseBtn() {
		setVisible(false)
	}

	const colors = { good: 'good', bad: 'bad', neutral: '' }
	let colorClass = ''

	if (!date) {
		date = ' '
	}

	if (Object.keys(colors).includes(type)) {
		colorClass = colors[type]
	}

	return (
		<>
			{visible ? (
				<div className="current-prize card-item unselectable">
					{title ? <div className="current-prize__title">{title}</div> : null}
					<div className={'current-prize__prize ' + colorClass}>
						{chartLoaded ? (
							<>
								{Math.trunc(prize)}
								{Math.round((prize % 1) * 100, -2) === 0 ? null : (
									<p id="not-int-unit-part">
										.{Math.round((prize % 1) * 100, -2)}
									</p>
								)}
								<p>{unit ? unit : ''}</p>
							</>
						) : null}
					</div>
					<div className="current-prize__date">{date}</div>
					{closeBtn ? (
						<button onClick={onCloseBtn} className="current-prize__close-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
								<path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
							</svg>
						</button>
					) : null}
				</div>
			) : null}
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
	closeBtn: PropTypes.bool,
}

export default DisplayCard
