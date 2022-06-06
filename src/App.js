import React, { useState } from 'react'

import './App.css'

import LogInBar from './Components/LogInBar/LogInBar'
import Navigation from './Components/Navigation/Navigation'

import Context from './context'

function App() {
	const [isLogged, setLogged] = useState(false)

	return (
		<>
			<Context.Provider value={{ isLogged, setLogged }}>
				<div className="content-wrapper">
					<LogInBar />
					<div className="content">
						<Navigation />
					</div>
					<p className="footer__copy"> &#169; by MDGT </p>
				</div>
			</Context.Provider>
		</>
	)
}

export default App
