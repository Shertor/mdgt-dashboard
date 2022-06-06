import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(...registerables)

export default function ReportsDoughnut({ dataset }) {
	const inputData = { ...dataset.reports }

	const reportsDatasets = []
	const labels = []

	const labelsNames = {
		python_report: 'Другое',
		python_dynamic_report: 'Динамика',
		python_compression_report: 'Компрессия',
	}

	const types = Object.keys(labelsNames)
	types.forEach((type) => {
		reportsDatasets.push(inputData[type])
		labels.push(labelsNames[type])
	})

	const typesColors = ['hsl(221, 24%, 32%)', '#3D84A8', '#46CDCF', '#ABEDD8']

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: false,
				text: 'Соотношение протоколов Python',
			},
			legend: {
				position: 'bottom',
			},
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
			},
		},
	}

	const data = {
		labels,
		datasets: [
			{
				label: 'Количество',
				data: reportsDatasets,
				backgroundColor: typesColors,
			},
		],
	}

	return (
		<React.Fragment>
			<Doughnut options={options} data={data} />
		</React.Fragment>
	)
}
