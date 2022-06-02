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
				<div className="transparent-item">
					<DisplayCard
						title="Текущая премия"
						prise={300}
						date={'07.2022'}
						chartLoaded={true}
					/>
				</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
