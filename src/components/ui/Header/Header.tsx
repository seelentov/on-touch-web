import { CSSProperties, FC } from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'

export interface IHeaderProps {
className?: string
style?: CSSProperties
}

export const Header: FC<IHeaderProps> = ({className, style}) => {
  return (
    <div className={cn(className, styles.block)} style={style}>
      
    </div>
  );
}