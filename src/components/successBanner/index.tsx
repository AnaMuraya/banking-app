import cn from 'classnames'

import styles from './styles.module.scss'

export default function SuccessBanner({ showSuccessMessage }: { showSuccessMessage: boolean }) {
  return <p className={cn(styles.success, { [styles.active]: showSuccessMessage })}>Request submitted successfully</p>
}
