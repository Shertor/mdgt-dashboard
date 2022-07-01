import React, { useContext } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'

import Prize from '../Prize/Prize'
import Reports from '../Reports/Reports'
import Staff from '../Staff/Staff'

import './Summary.css'

export default function Summary() {
	const { isLogged } = useContext(Context)

	return (
		<>
			{isLogged ? (
				<>
					<div className="transparent-item summary-flex">
						<Staff />
						<Prize toSummary={false} />
						<div className="transparent-item test-item"></div>
						<Reports toSummary={true} />
					</div>
				</>
			) : (
				<NotLogged />
			)}
		</>
	)
}
