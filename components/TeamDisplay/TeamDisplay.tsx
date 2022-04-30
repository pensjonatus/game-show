import styles from './TeamDisplay.module.css';

export default function TeamDisplay({ name, avatar }) {
  return (
    <div className={styles.team}>
      {avatar && <img src={avatar} alt="" className={styles.avatar} />}
      <div className={styles.name}>{name}</div>
    </div>
  );
}
