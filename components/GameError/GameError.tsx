import { BackendError } from '../../lib/types';
import styles from './GameError.module.css';

export default function GameError({
  title,
  errorDetails,
}: {
  title: string;
  errorDetails: BackendError;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <code className={styles.errorDetails}>
        <pre>
          {errorDetails.response?.data?.message || errorDetails.message}
        </pre>
      </code>
    </div>
  );
}
