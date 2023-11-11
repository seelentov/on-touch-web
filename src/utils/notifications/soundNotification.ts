import { Howl } from 'howler';

export const soundNotification = () => {
	const sound = new Howl({
		src: ['../../../public/sound/notif-sound.mp3'],
	})

  sound.play()
}
