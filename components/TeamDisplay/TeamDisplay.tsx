import styles from './TeamDisplay.module.css';

export default function TeamDisplay({ name, avatar, score }) {
  return (
    <div className={styles.team}>
      <div className={styles.avatarBox}>
        {avatar && <img src={avatar} alt="" className={styles.avatar} />}
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.score}>{score}</div>
    </div>
  );
}
