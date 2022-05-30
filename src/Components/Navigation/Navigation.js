import { React, Component } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	NavLink,
} from 'react-router-dom'

import './Navigation.css'

import Prise from '../Prise/Prise'
import Reports from '../Reports/Reports'
import Payments from '../Payments/Payments'

export default class Navigation extends Component {
	render() {
		return (
			<>
				<Router>
					<nav className="navigation">
						<NavLink
							as={Link}
							to="/"
							className={({ isActive }) =>
								isActive ? 'nav-link is-active' : 'nav-link'
							}
						>
							Премия
						</NavLink>
						<NavLink
							as={Link}
							to="/Reports"
							className={({ isActive }) =>
								isActive ? 'nav-link is-active' : 'nav-link'
							}
						>
							Отчёты
						</NavLink>
						<NavLink
							as={Link}
							to="/Payments"
							className={({ isActive }) =>
								isActive ? 'nav-link is-active' : 'nav-link'
							}
						>
							Выплаты
						</NavLink>
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
