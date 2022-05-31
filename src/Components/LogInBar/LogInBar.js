import React, { useState } from 'react'
import './LogInBar.css'

function useInputValue(defaultValue = '') {
	const [value, setValue] = useState(defaultValue)

	return {
		bind: {
			value,
			onChange: (event) => setValue(event.target.value),
		},
		clear: () => setValue(''),
		value: () => value,
	}
}

async function login(username, password) {
	if (username === 'test' && password === '911') {
		return true
	}
	return false
}

export default function LogInBar() {
	const [isLogged, setLogged] = useState(false)
	const [userName, setUserName] = useState('')
	const [errClass, setErrClass] = useState('')

	let pending = false

	const user = useInputValue('')
	const password = useInputValue('')

	function onFormSubmit(event) {
		if (pending) return

		pending = true

		console.log(user.value())
		console.log(password.value())
		event.preventDefault()

		login(user.value(), password.value()).then((response) => {
			setTimeout(() => {
				console.log(response)
				if (response) {
					setUserName(user.value())
					setLogged(response)
					setErrClass('')
					pending = false
				} else {
					setErrClass('login-err')
					setTimeout(() => {
						setErrClass('')
					}, 2000)
					pending = false
				}
			}, 0)
		})
		pending = false
	}

	function onLogOutBtn() {
		console.log('logout')

		setLogged(false)
		setUserName('')
	}

	return (
		<React.Fragment>
			<div className="login-wrapper card-item">
				{isLogged ? (
					<div className="login-form">
						<div className="login-user">{userName}</div>
						<button onClick={onLogOutBtn} className="form-submit">
							Выйти
						</button>
					</div>
				) : (
					<form
						action=""
						onSubmit={onFormSubmit}
						className="login-form"
						id="loginForm"
					>
						<input
							type="text"
							{...user.bind}
							className={'form-item ' + errClass}
							placeholder="Имя пользователя"
						/>
						<input
							{...password.bind}
							type="password"
							className={'form-item ' + errClass}
							placeholder="Пароль"
						/>
						<button type="submit" className="form-submit">
							Войти
						</button>
					</form>
				)}
			</div>
		</React.Fragment>
	)
}
