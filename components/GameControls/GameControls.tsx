import styles from './GameControls.module.css';
import StartStop from './components/StartStop/StartStop';
import ManageQuestions from './components/ManageQuestions/ManageQuestions';

export default function GameControls() {
  return (
    <section className={styles.gameControlPanel}>
      <StartStop />
      <ManageQuestions/>
    </section>
  );
}
