export function parsePrizes(data) {
	const options = { year: 'numeric', month: 'short' }

	const prizes = []
	const dates = []

	const items = Object.keys(data)

	if (items.length > 0) {
		items.forEach((item) => {
			prizes.push(data[item].prize)
			const date = new Intl.DateTimeFormat('ru-RU', options)
				.format(new Date(data[item].date))
				.replace(' г.', '')

			dates.push(date)
		})
	}

	const resultData = { prizes: prizes, dates: dates }
	return resultData
}

export async function getPrizes() {
	const range = 300
	return {
		prizes: [
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

export async function login(username, password) {
	if (username === 'test' && password === '911') {
		return true
	}
	return false
}

export function parseReports(data) {
	const options = { year: 'numeric', month: 'short' }

	const reports = []
	const dates = []

	const items = Object.keys(data)

	if (items.length > 0) {
		items.forEach((item) => {
			const reportItem = { ...data[item] }
			delete reportItem.date
			reports.push(reportItem)
			const date = new Intl.DateTimeFormat('ru-RU', options)
				.format(new Date(data[item].date))
				.replace(' г.', '')

			dates.push(date)
		})
	}

	const resultData = { reports: reports, dates: dates }

	return resultData
}
