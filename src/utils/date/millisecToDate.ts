export const millisecToDate = (time: number) => {
  const date = new Date(time)
  const currentDate = new Date()
  
  const day = String(date.getDate())
  const month = String(date.getMonth() + 1)
  const year = date.getFullYear()
  
  if (date.toDateString() === currentDate.toDateString()) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return hours + ':' + minutes
  } else {
    return year + '-' + month + '-' + day
  }
}