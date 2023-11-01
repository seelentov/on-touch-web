import {
	FieldPath,
	WhereFilterOp,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import { db } from './firebase.api'

type FBCondition = [string | FieldPath, WhereFilterOp, unknown]

type CollData = (coll: string) => Promise<object[]>
type UpData = (coll: string, item: string, props: object) => Promise<void>
type SingleData = (coll: string, item: string) => Promise<object>
type SomeData = (coll: string, condition: FBCondition) => Promise<object>

export const updateData: UpData = async (
	coll: string,
	item: string,
	props: object
) => {
	return new Promise((resolve, reject) => {
		updateDoc(doc(db, coll, item), props)
			.then(() => {
				resolve()
			})
			.catch(error => {
				reject(error)
			})
	})
}

export const addToData: UpData = async (coll, item, props) => {
	return new Promise((resolve, reject) => {
		setDoc(doc(collection(db, coll), item), { ...props })
			.then(() => {
				resolve()
			})
			.catch(error => {
				reject(error)
			})
	})
}

export const getColl: CollData = async coll => {
	return new Promise((resolve, reject) => {
		getDocs(collection(db, coll))
			.then(querySnapshot => {
				const result: object[] = []
				querySnapshot.forEach(doc => {
					result.push(doc.data())
				})
				if (!result) {
					throw new Error(`Коллекции ${coll} не существует`)
				}
				resolve(result)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export const getSomeData: SomeData = async (coll, condition) => {
	return new Promise((resolve, reject) => {
		getDocs(
			query(
				collection(db, 'cities'),
				where(condition[0], condition[1], condition[2])
			)
		)
			.then(querySnapshot => {
				const result: object[] = []
				querySnapshot.forEach(doc => {
					result.push(doc.data())
				})
				if (!result) {
					throw new Error(`Коллекции ${coll} не существует`)
				}
				resolve(result)
			})
			.catch(error => {
				reject(error)
			})
	})
}

export const getData: SingleData = async (coll, item) => {
	return new Promise((resolve, reject) => {
		getDoc(doc(db, coll, item))
			.then(doc => {
				if (doc.exists()) {
					resolve(doc.data())
				} else {
					throw new Error(`Объект ${item} отсутствует`)
				}
			})
			.catch(error => {
				reject(error)
			})
	})
}

export const subscribeSomeData = async <T>(
	coll: string,
	condition: FBCondition,
	callback: (arg0: T) => void
) => {
	return onSnapshot(
		query(
			collection(db, coll),
			where(condition[0], condition[1], condition[2])
		),
		querySnapshot => {
			const result: object[] = []
			querySnapshot.forEach(doc => {
				result.push(doc.data())
			})
			if (!result) {
				console.log(`Коллекции ${coll} не существует`)
			}
			callback(result as T)
		}
	)
}

export const subscribeColl = async <T>(
	coll: string,
	callback: (arg0: T) => void
) => {
	return onSnapshot(query(collection(db, coll)), querySnapshot => {
		const result: object[] = []
		querySnapshot.forEach(doc => {
			result.push(doc.data())
		})
		if (!result) {
			console.log(`Коллекции ${coll} не существует`)
		}
		callback(result as T)
	})
}

export const subscribeData = async <T>(
	coll: string,
	item: string,
	callback: (arg0: T) => void
) => {
	const unsub = onSnapshot(
		doc(db, coll, item),
		{ includeMetadataChanges: true },
		doc => {
			if (!doc.exists()) {
				console.log(`Объект ${item} отсутствует`)
			} else {
				callback(doc.data() as T)
			}
		}
	)
	return unsub
}
