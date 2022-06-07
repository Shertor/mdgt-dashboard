import React, { useState, useContext } from 'react'
import axios from 'axios'

import './LogInBar.css'

import Context from '../../context'

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

export default function LogInBar() {
	const client = axios.create()

	const { isLogged, setLogged, api } = useContext(Context)

	const [userName, setUserName] = useState('')
	const [errClass, setErrClass] = useState('')

	let pending = false

	const user = useInputValue('')
	const password = useInputValue('')

	function clearInput() {
		user.clear()
		password.clear()
	}

	function onFormSubmit(event) {
		if (pending) return

		if (!user.value() || !password.value()) return

		pending = true

		event.preventDefault()

		client.interceptors.request.use(
			(config) => {
				// Код, необходимый до отправки запроса
				config.method = 'post'
				config.headers['Access-Control-Allow-Origin'] =
					'http://192.168.0.41:3000/'
				config.withCredentials = true
				return config
			},
			(error) => {
				// Обработка ошибки до запроса
				return { status: error.status }
			}
		)

		// Add a response interceptor
		client.interceptors.response.use(
			function(response) {
				if (response.status === 200) {
					setUserName(user.value())
					setLogged(true)
					setErrClass('')
					clearInput()
					pending = false
				}
				return response
			},
			function(error) {
				// Do something with response error
				setErrClass('login-err')
				setTimeout(() => {
					setErrClass('')
				}, 2000)
				clearInput()
				pending = false
				return { status: error.status }
			}
		)

		client.post(
			`${api}authorization/sign-in/`,
			`username=${user.value()}&password=${password.value()}`
		)
	}

	function onLogOutBtn() {
		setLogged(false)
		setUserName('')

		fetch(`${api}authorization/sign-out/`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
			credentials: 'include',
		}).then((response) => {
			if (response.ok) {
				setLogged(false)
				setUserName('')
			}
		})
	}

	return (
		<React.Fragment>
			<div className="login-wrapper card-item unselectable">
				{isLogged ? (
					<div className="login-form">
						<div className="login-user unselectable">{userName}</div>
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
