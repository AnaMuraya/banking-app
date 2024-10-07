'use client'

import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PiBank } from 'react-icons/pi'

import { useActiveTabContext } from '@/contexts'
import { TransactionTypes } from '@/types'

import styles from './styles.module.scss'

export default function Header() {
  const { activeTab } = useActiveTabContext()
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <Link className={cn(styles.logo, { [styles.inActive]: !!activeTab })} href={'/'}>
          <PiBank size={24} />
        </Link>

        <ol className={styles.navItemsWrapper}>
          {Object.values(TransactionTypes).map((label, _) => (
            <motion.li
              key={_}
              animate
              onClick={() => router.push(`/${label}`)}
              className={cn(styles.navButton, { [styles.active]: activeTab === label })}
            >
              <AnimatePresence initial={true} mode="popLayout">
                {activeTab === label && (
                  <motion.div
                    layoutId="navItemUnderline"
                    className={styles.underline}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
              {label}
            </motion.li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
