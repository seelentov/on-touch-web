import { CSSProperties, FC } from 'react'
import styles from './Logo.module.scss'
import cn from 'classnames'

export interface ILogoProps {
className?: string
style?: CSSProperties

}

export const Logo: FC<ILogoProps> = ({className, style}) => {
  return (
    <div className={cn(className, styles.logo)} style={style}>
      in<span>Touch</span>
    </div>
  );
}