import React from 'react'

import './App.css'

import LogInBar from './Components/LogInBar/LogInBar'
import Navigation from './Components/Navigation/Navigation'

function App() {
	return (
		<div className="content-wrapper">
			<LogInBar />
			<div className="content">
				<Navigation />
			</div>
		</div>
	)
}

export default App
