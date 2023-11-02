import styles from './Loading.module.scss'
export const Loading = () => {
	return (
		<div className={styles.loading}>
			<div
				className={styles.loader}
				style={{ borderTop: `16px solid white` }}
			></div>
		</div>
	)
}
