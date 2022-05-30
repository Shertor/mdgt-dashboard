import { React, Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Prise from '../Prise/Prise'
import Reports from '../Reports/Reports'
import Payments from '../Payments/Payments'

export default class Navigation extends Component {
	render() {
		return (
			<>
				<Router>
					<nav className="navigation">
						<Link as={Link} to="/" className="nav-link">
							Премия
						</Link>
						<Link as={Link} to="/Reports" className="nav-link">
							Отчёты
						</Link>
						<Link as={Link} to="/Payments" className="nav-link">
							Выплаты
						</Link>
					</nav>

					<Routes>
						<Route path="/" element={<Prise />} />
						<Route path="/Reports" element={<Reports />} />
						<Route path="/Payments" element={<Payments />} />
					</Routes>
				</Router>
			</>
		)
	}
}
