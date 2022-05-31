import React, { useContext, useEffect } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import PriseChart from './PriseChart'

async function getPrises() {
	return {
		prises: [
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
		],
		dates: [
			'01.2022',
			'02.2022',
			'03.2022',
			'04.2022',
			'05.2022',
			'06.2022',
			'07.2022',
		],
	}
}

export default function Prise() {
	const { isLogged } = useContext(Context)
	const [prises, setPrises] = React.useState({ prises: [], dates: [] })

	useEffect(() => {
		if (isLogged) {
			getPrises().then((response) => {
				console.log(response)
				setPrises(response)
			})
		}
	}, [isLogged])

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="card-item">
					<PriseChart dataset={prises} />
				</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
