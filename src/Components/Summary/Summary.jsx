import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context'

import NotLogged from '../NotLogged/NotLogged'
import DisplayCard from '../DisplayCard/DisplayCard'
import { parsePrizes } from '../utils'

import Prize from '../Prize/Prize'
import Reports from '../Reports/Reports'

import './Summary.css'

export default function Summary() {
	const { isLogged, api } = useContext(Context)

	// const [prizes, setPrizes] = useState({ prizes: [], dates: [] })

	// const [prizeLoaded, setPrizeLoaded] = useState(false)

	// useEffect(() => {
	// 	function updatePrizeChart() {
	// 		if (isLogged) {
	// 			fetch(`${api}prizes/`)
	// 				.then((response) => response.json())
	// 				.then((data) => {
	// 					const resultData = parsePrizes(data)
	// 					setPrizes(resultData)
	// 					setPrizeLoaded(true)
	// 				})
	// 		}
	// 	}

	// 	updatePrizeChart()

	// 	const interval = setInterval(updatePrizeChart, 100000)

	// 	return () => {
	// 		clearInterval(interval)
	// 	}
	// }, [isLogged])

	// useEffect(() => {
	// 	if (!isLogged) {
	// 		setPrizes({ prizes: [], dates: [] })
	// 	}
	// }, [isLogged])

	return (
		<>
			{isLogged ? (
				<div className="transparent-item summary-flex">
					<Prize toSummary={true} />
					<Reports toSummary={true} />
				</div>
			) : (
				<NotLogged />
			)}
		</>
	)
}

{
	/* <React.Fragment>
{isLogged ? (
	<div className="transparent-item summary-flex">
		<DisplayCard
			title={'Текущая премия'}
			prize={prizes.prizes[prizes.prizes.length - 1]}
			date={prizes.dates[prizes.prizes.length - 1]}
			chartLoaded={prizeLoaded}
			unit={'%'}
			type={
				prizes.prizes[prizes.prizes.length - 1] <
				Math.max(...prizes.prizes)
					? 'bad'
					: ''
			}
		/>
		<DisplayCard
			title="Отчеты"
			prize={14}
			chartLoaded={true}
			type={'bad'}
		/>
		<DisplayCard title="Выплата" prize={123.83651} chartLoaded={true} />
	</div>
) : (
	<NotLogged />
)}
</React.Fragment> */
}
