import React, { useContext, useState, useEffect } from 'react'

import './Prize.css'

import Context from '../../context'
import NotLogged from '../NotLogged/NotLogged'
import PrizeChart from './PrizeChart'
import DisplayCard from '../DisplayCard/DisplayCard'
import { parsePrizes } from '../utils'

export default function prize() {
	const { isLogged } = useContext(Context)
	const [prizes, setPrizes] = useState({ prizes: [], dates: [] })

	const [chartLoaded, setChartLoaded] = useState(false)

	useEffect(() => {
		function updatePrizeChart() {
			if (isLogged) {
				fetch('http://192.168.0.200/prizes/')
					.then((response) => response.json())
					.then((data) => {
						const resultData = parsePrizes(data)
						setPrizes(resultData)
						setChartLoaded(true)
					})
			}
		}

		updatePrizeChart()

		console.log('useEffect ')
		const interval = setInterval(updatePrizeChart, 100000)

		return () => {
			clearInterval(interval)
		}
	}, [isLogged])

	useEffect(() => {
		if (!isLogged) {
			setPrizes({ prizes: [], dates: [] })
		}
	}, [isLogged])

	return (
		<>
			{isLogged ? (
				<div className="transparent-item prize-grid">
					<div className="chart-card card-item">
						<h1 className="chart-card__header">Динамика премии в процентах</h1>
						<div className="chart-card__chart">
							{chartLoaded ? (
								<PrizeChart dataset={prizes} />
							) : (
								<div className="blank-page-ar-2"></div>
							)}
						</div>
					</div>
					<DisplayCard
						title={'Текущая премия'}
						prize={prizes.prizes[prizes.prizes.length - 1]}
						date={prizes.dates[prizes.prizes.length - 1]}
						chartLoaded={chartLoaded}
					/>
				</div>
			) : (
				<NotLogged />
			)}
		</>
	)
}
