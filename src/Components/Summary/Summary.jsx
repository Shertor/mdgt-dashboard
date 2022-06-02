import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'

export default function Summary() {
	const { isLogged } = useContext(Context)

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="card-item">This is a Summary page!</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
