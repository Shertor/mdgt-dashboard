import React, { useContext, useState, useEffect } from 'react'
import Context from '../../context'
import './Reports.css'

import NotLogged from '../NotLogged/NotLogged'
import { parseReports } from '../utils'
import ReportsBarChart from './ReportsBarChart'
import ReportsDoughnut from './ReportsDoughnut'

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
				<div className="transparent-item reports-grid">
					<div className="chart-card card-item">
						<h1 className="chart-card__header">
							Выдано за {reports.dates[reports.dates.length - 1]}
						</h1>
						<div className="chart-card__chart">
							{reportsLoaded ? (
								<ReportsBarChart
									dataset={{
										reports: reports.reports[reports.reports.length - 1],
									}}
								/>
							) : (
								<div className="blank-page-ar-2"></div>
							)}
						</div>
					</div>
					<div className="chart-card card-item reports-doughnut-item">
						<h1 className="reports-doughnut-item__title">
							Протоколы на Python
						</h1>
						<div className="reports-doughnut-item__doughnut">
							<ReportsDoughnut
								dataset={{
									reports: reports.reports[reports.reports.length - 1],
								}}
							/>
						</div>
					</div>
				</div>
			) : (
				<NotLogged />
			)}
		</React.Fragment>
	)
}
