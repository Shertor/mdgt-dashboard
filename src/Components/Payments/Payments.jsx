import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'

export default function Payments() {
	const { isLogged } = useContext(Context)

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="card-item">This is a Payments page!</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
