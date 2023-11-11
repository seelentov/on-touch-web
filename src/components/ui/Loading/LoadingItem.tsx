import styles from './Loading.module.scss'
export const LoadingItem = () => {
	return (
		<div className={styles.loadingItem}>
			<div
				className={styles.loaderItem}
				style={{ borderTop: `16px solid white` }}
			></div>
		</div>
	)
}