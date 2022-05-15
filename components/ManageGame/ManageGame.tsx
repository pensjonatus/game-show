import styles from './ManageGame.module.css';
import StartStop from './components/StartStop/StartStop';
import ManageQuestions from './components/ManageQuestions/ManageQuestions';
import PreviousNext from './components/ManageQuestions/PreviousNext/PreviousNext';

export default function ManageGame() {
  return (
    <section className={styles.gameControlPanel}>
      <StartStop />
      <ManageQuestions />
      <PreviousNext />
    </section>
  );
}
