import React, { useContext, useState, useEffect } from 'react'
import Context from '../../context'
import './Reports.css'

import NotLogged from '../NotLogged/NotLogged'
import { parseReports } from '../utils'

export default function Reports() {
	const { isLogged, api } = useContext(Context)
	const [reports, setReports] = useState({ reports: [], dates: [] })

	const [reportsLoaded, setReportsLoaded] = useState(false)

	useEffect(() => {
		function updateReportsChart() {
			if (isLogged) {
				fetch(`${api}reports/`)
					.then((response) => response.json())
					.then((data) => {
						const resultData = parseReports(data)
						setReports(resultData)
						setReportsLoaded(true)
					})
			}
		}

		updateReportsChart()

		const interval = setInterval(updateReportsChart, 100000)

		return () => {
			clearInterval(interval)
		}
	}, [isLogged])

	return (
		<React.Fragment>
			{isLogged ? (
				<div className="transparent-item reports-grid"></div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
