import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'

export default function Reports() {
	const { isLogged } = useContext(Context)

	return (
		<React.Fragment>
			{isLogged ? <div className="card-item"></div> : <NotLogged />}
		</React.Fragment>
	)
}
