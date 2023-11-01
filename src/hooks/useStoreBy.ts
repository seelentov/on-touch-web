import { useSelector } from 'react-redux'

export const useStoreBy = (name:string) => {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useSelector((state:any) => state[name])
}
