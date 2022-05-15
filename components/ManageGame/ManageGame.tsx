import styles from './ManageGame.module.css';
import StartStop from './components/StartStop/StartStop';
import ManageQuestions from './components/ManageQuestion/ManageQuestion';
import PreviousNext from './PreviousNext/PreviousNext';

export default function ManageGame() {
  return (
    <section className={styles.gameControlPanel}>
      <StartStop />
      <ManageQuestions />
      <PreviousNext />
    </section>
  );
}
