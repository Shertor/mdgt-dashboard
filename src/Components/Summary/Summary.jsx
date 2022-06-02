import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import CurrentPrise from '../Prise/CurrentPrise'

import './Summary.css'

export default function Summary() {
	const { isLogged } = useContext(Context)

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="transparent-item">
					<CurrentPrise prise={300} date={'07.2022'} chartLoaded={true} />
				</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
