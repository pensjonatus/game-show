import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>S.U.P.E.R. G.A.M.E.</title>
        <meta
          name="description"
          content="That's right, it's S.U.P.E.R. G.A.M.E.!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to S.U.P.E.R. G.A.M.E.</h1>
        <p>It's the game of games</p>
        <div>Some div</div>
        <article>
          <h2>Let's learn some stuff</h2>
          <p>
            Belo lelo Belo lelo Belo lelo Belo lelo Belo lelo Belo lelo Belo
            lelo Belo lelo Belo lelo Belo lelo Belo lelo Belo lelo Belo lelo
            Belo lelo Belo lelo
          </p>
        </article>
      </main>
    </div>
  );
}
