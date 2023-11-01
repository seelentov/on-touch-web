import { CSSProperties, FC } from 'react'
import styles from './Messages.module.scss'
import cn from 'classnames'

export interface IMessagesProps {
className?: string
style?: CSSProperties

}

export const Messages: FC<IMessagesProps> = ({className, style}) => {
  return (
    <div className={cn(className, styles.block)} style={style}>
      
    </div>
  );
}