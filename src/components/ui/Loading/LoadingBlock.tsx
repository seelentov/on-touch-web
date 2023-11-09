import styles from './Loading.module.scss'
export const LoadingBlock = () => {
	return (
		<div className={styles.loadingBlock}>
			<div
				className={styles.loader}
				style={{ borderTop: `16px solid white` }}
			></div>
		</div>
	)
}
