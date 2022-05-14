import styles from './ManageGame.module.css';
import StartStop from './components/StartStop/StartStop';
import ManageQuestions from './components/ManageQuestions/ManageQuestions';

export default function ManageGame() {
  return (
    <section className={styles.gameControlPanel}>
      <StartStop />
      <ManageQuestions />
    </section>
  );
}
