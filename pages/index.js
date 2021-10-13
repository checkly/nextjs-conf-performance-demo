import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

console.error('Something really went wrong here')

export default function Home() {
  const [didClick, setClickState] = useState(false);

  function toggle(){
    setClickState(!didClick);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js performance & reliability talk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <a href="https://nextjs.org">Next.js</a> page!
        </h1>
        <button className={styles.button} onClick={toggle} data-test-id="button">Click me</button>
        <p style={{display: didClick ? "block" : "none"}}>You clicked it</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
      <img src="https://thisdoesnotexistimprettysure123yolo.com" alt="So yeah, this image does not exist."/>
    </div>
  )
}

