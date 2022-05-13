import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => {

  const left = (
    <div className={styles.left}>
      <Link href="/">
        <a>
          <Image src="/logo.png" alt="logo" width="32" height="32" />
        </a>
      </Link>
      <Link href="/game">
        <a target="_blank" className="button">
          Game
        </a>
      </Link>
    </div>
  );


  return (
    <nav>
      {left}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
