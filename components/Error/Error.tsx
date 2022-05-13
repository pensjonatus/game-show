import { BackendError } from '../../lib/types';
import styles from './Error.module.css';

export default function Error({
  title,
  gameError,
}: {
  title: string;
  gameError: BackendError;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div>{gameError.response?.data?.message || gameError.message}</div>
    </div>
  );
}
