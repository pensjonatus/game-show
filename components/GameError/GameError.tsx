import { BackendError } from '../../lib/types';
import styles from './GameError.module.css';

export default function GameError({
  title,
  gameError,
}: {
  title: string;
  gameError: BackendError;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <code className={styles.errorDetails}>
        <pre>{gameError.response?.data?.message || gameError.message}</pre>
      </code>
    </div>
  );
}
