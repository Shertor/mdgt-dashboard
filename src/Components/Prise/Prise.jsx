import React, { useContext, useState, useEffect } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import PriseChart from './PriseChart'

import './Prise.css'

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
	const [prises, setPrises] = useState({ prises: [], dates: [] })

	useEffect(() => {
		console.log('useEffect ')
		const interval = setInterval(() => {
			if (isLogged) {
				setTimeout(() => {
					getPrises().then((response) => {
						console.log(response)
						setPrises(response)
					})
				}, 1000)
			}
		}, 5000)

		return () => {
			clearInterval(interval)
		}
	}, [isLogged])

	useEffect(() => {
		if (!isLogged) {
			setPrises({ prises: [], dates: [] })
		}
	}, [isLogged])

	return (
		<>
			{isLogged ? (
				<div className="transparent-item">
					<div className="prise-chart-card card-item">
						<PriseChart dataset={prises} />
					</div>
				</div>
			) : (
				<NotLogged />
			)}
		</>
	)
}
