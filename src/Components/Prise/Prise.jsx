import React, { useContext, useState, useEffect } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import PriseChart from './PriseChart'
import CurrentPrise from './CurrentPrise'

import './Prise.css'

async function getPrises() {
	const range = 300
	return {
		prises: [
			Math.round(Math.random() * range),
			Math.round(Math.random() * range),
			Math.round(Math.random() * range),
			Math.round(Math.random() * range),
			Math.round(Math.random() * range),
			Math.round(Math.random() * range),
			Math.round(Math.random() * range),
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

	const [chartLoaded, setChartLoaded] = useState(false)

	useEffect(() => {
		function updatePriseChart() {
			if (isLogged) {
				setTimeout(() => {
					getPrises().then((response) => {
						console.log(response)
						setPrises(response)
						setChartLoaded(true)
					})
				}, 1000)
			}
		}

		updatePriseChart()

		console.log('useEffect ')
		const interval = setInterval(updatePriseChart, 100000)

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
				<div className="transparent-item prise-grid">
					<div className="chart-card card-item">
						{chartLoaded ? (
							<PriseChart dataset={prises} />
						) : (
							<div className="blank-page-ar-2"></div>
						)}
					</div>
					<CurrentPrise
						prise={prises.prises[prises.prises.length - 1]}
						date={prises.dates[prises.prises.length - 1]}
						chartLoaded={chartLoaded}
					/>
				</div>
			) : (
				<NotLogged />
			)}
		</>
	)
}
