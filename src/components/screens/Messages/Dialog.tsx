import { CSSProperties, FC } from 'react'
import styles from './Dialog.module.scss'
import cn from 'classnames'

export interface IDialogProps {
className?: string
style?: CSSProperties

}

export const Dialog: FC<IDialogProps> = ({className, style}) => {
  return (
    <div className={cn(className, styles.block)} style={style}>
      asdasdas
    </div>
  );
}