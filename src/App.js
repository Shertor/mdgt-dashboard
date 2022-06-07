import React, { useState } from 'react'

import './App.css'

import LogInBar from './Components/LogInBar/LogInBar'
import Navigation from './Components/Navigation/Navigation'

import Context from './context'

function App() {
	const [isLogged, setLogged] = useState(false)
	const [api, setApi] = useState('http://192.168.0.41:8000/')

	return (
		<>
			<Context.Provider value={{ isLogged, setLogged, api }}>
				<div className="content-wrapper">
					<LogInBar />
					<div className="content">
						<Navigation />
					</div>
					<p className="footer__copy unselectable"> &#169; by MDGT </p>
				</div>
			</Context.Provider>
		</>
	)
}

export default App
