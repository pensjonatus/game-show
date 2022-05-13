import styles from './Mask.module.css';

export default function Mask({ width }) {
  return <div style={{ width: width }} className={styles.mask} />;
}
