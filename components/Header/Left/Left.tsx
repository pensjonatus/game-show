import Link from 'next/link';
import Image from 'next/image';
import styles from './Left.module.css';
import { useGame } from '../../../lib/gameHooks';

export default function Left() {
  const { game, isError, isLoading } = useGame();

  if (isError || isLoading) {
    return null;
  }

  return (
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
}
