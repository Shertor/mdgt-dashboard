import React, { useContext, useState, useEffect } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import PriseChart from './PriseChart'
import DisplayCard from '../DisplayCard/DisplayCard'

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
		dates: ['янв', 'февр', 'мар', 'апр', 'май', 'июнь', 'июль'],
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
						<h1 className="chart-card__header">Динамика премии в процентах</h1>
						<div className="chart-card__chart">
							{chartLoaded ? (
								<PriseChart dataset={prises} />
							) : (
								<div className="blank-page-ar-2"></div>
							)}
						</div>
					</div>
					<DisplayCard
						title={'Текущая премия'}
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
