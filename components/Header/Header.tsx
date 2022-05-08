import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();

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

  let right = null;

  if (status === 'loading') {
    right = (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className={styles.right}>
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')} className="button">
            Log in
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    right = (
      <div className={styles.right}>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <button onClick={() => signOut()} className="button">
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
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
