import React, { useState } from 'react'

import styles from './CurrencyPicker.module.scss'

const CurrencyPicker = ({ list, currentCurrency, setCurrentCurrency }) => {
	const [open, setOpen] = useState(false)

	const onClickListItem = obj => {
		setOpen(false)
		setCurrentCurrency(obj)
	}

	return (
		<div className={styles.root} onClick={() => setOpen(!open)}>
			<div className={styles.title}>
				{currentCurrency.CharCode} ({currentCurrency.Name})
			</div>
			{open && (
				<div className={styles.dropdown}>
					{Object.keys(list).map(item => (
						<div
							className={styles.dropdownItem}
							key={list[item].ID}
							onClick={() => onClickListItem(list[item])}
						>
							{list[item].CharCode} ({list[item].Name})
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CurrencyPicker
