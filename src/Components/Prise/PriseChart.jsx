import React from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export default function PriseChart({ dataset }) {
	const options = {
		responsive: true,
		// maintainAspectRatio: false,
		plugins: {
			title: {
				display: false,
				text: 'Chart.js Line Chart - Cubic interpolation mode',
			},
			legend: {
				display: false,
			},
		},
		interaction: {
			intersect: false,
		},
		scales: {
			x: {
				display: true,
				title: {
					display: false,
				},
				ticks: {
					color: 'black',
				},
			},
			y: {
				display: true,
				title: {
					display: true,
					text: 'Премия, %',
					font: {
						size: 14,
					},
					color: 'black',
				},
				suggestedMin: 0,
				suggestedMax: Math.max(...dataset.prises),
				ticks: {
					color: 'black',
				},
			},
		},
	}

	const labels = dataset.dates

	const data = {
		labels,
		datasets: [
			{
				label: 'Премия',
				data: dataset.prises,
				borderColor: 'hsl(221, 24%, 32%)',
				fill: false,
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
			},
		],
	}

	return (
		<React.Fragment>
			<Line options={options} data={data} />
		</React.Fragment>
	)
}
