import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'

export default function Reports() {
	const { isLogged } = useContext(Context)

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="card-item">This is a Reports page!</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
