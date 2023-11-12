/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../store/api/firebase/firebase.api'

export const uploadImage = async (file: any, path: string) => {
	const storageRef = ref(storage, `${path}/${file.name}`)
	await uploadBytes(storageRef, file)
	const imageUrl = await getDownloadURL(storageRef)
	return imageUrl
}
