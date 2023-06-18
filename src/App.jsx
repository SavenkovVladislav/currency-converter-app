import CurrencyPicker from './components/CurrencyPicker/CurrencyPicker'
import { useEffect, useState, useCallback } from 'react'
import debounce from 'lodash.debounce'

import { ReactComponent as Loader } from './assets/icons/loader.svg'

import styles from './App.module.scss'

function App() {
	const [loading, setLoading] = useState(true)
	const [list, setList] = useState([])
	const [value, setValue] = useState('')
	const [localValue, setLocalValue] = useState('')
	const [currentCurrency, setCurrentCurrency] = useState({
		CharCode: 'AED',
		ID: 'R01230',
		Name: 'Дирхам ОАЭ',
		Nominal: 1,
		NumCode: '784',
		Previous: 22.9587,
		Value: 22.8596,
	})

	useEffect(() => {
		setLoading(true)
		fetch('https://www.cbr-xml-daily.ru/daily_json.js')
			.then(res => res.json())
			.then(data => {
				setList(data.Valute)
			})
		setLoading(false)
	}, [])

	const updateValue = useCallback(
		debounce(value => {
			setValue(value)
		}, 1000),
		[]
	)

	const onChangeInput = event => {
		setLocalValue(event.target.value)
		updateValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			{loading ? (
				<div>
					<Loader />
				</div>
			) : (
				<div className={styles.content}>
					<h1>Конвертер валют</h1>
					<input
						className={styles.input}
						type='text'
						placeholder='Сумма в валюте'
						value={localValue}
						onChange={onChangeInput}
					/>
					<CurrencyPicker
						list={list}
						currentCurrency={currentCurrency}
						setCurrentCurrency={setCurrentCurrency}
					/>
					<div className={styles.inputWrapper}>
						<input
							className={styles.input}
							type='text'
							placeholder='Сумма в рублях'
							value={(currentCurrency.Value / currentCurrency.Nominal) * value}
						/>
						<span>&#8381;</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
