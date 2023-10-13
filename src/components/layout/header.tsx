"use client"

import Image from 'next/image'
import styles from './header.module.scss'
import { OpenCloseModal } from "@/utils/modal"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <div className={styles.header_logo}>
            <a
              href="/"
            >
              <Image
                    src="/as-logo.svg"
                    alt="A.S! Logo"
                    width={186}
                    height={34}
                    priority
              />
            </a>
          </div>
          <div className={`button ` + styles.transaction_button} onClick={OpenCloseModal}>
            Nova Transação
          </div>
        </div>
      </div>
    </header>
  )
}
