import React from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export interface NavItem {
  label: string
  path: string
}

interface NavProps {
  items: Array<NavItem>
}

const Nav: React.FC<NavProps> = ({ items }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <img
          src="https://theme.hstatic.net/1000197303/1001046599/14/logo.png?v=10160"
          className={styles.image}
          alt="Logo"
        />
        {items.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <a href={item.path} className={styles.navLink}>
              {item.label}
            </a>
          </li>
        ))}
        <div className={styles.iconGroup}>
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
          <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
        </div>
      </ul>
    </nav>
  )
}

export default Nav
