import { Answer } from '@prisma/client';
import { useAnswer } from '../../../../lib/gameHooks';
import Error from '../../../Error/Error';
import Mask from '../Mask/Mask';
import styles from './DisplayAnswer.module.css';

export default function DisplayAnswer({ answerId }) {
  const {
    answer,
    isLoading,
    isError,
  }: { [x: string]: Answer; isError: any; isLoading: any } =
    useAnswer(answerId);

  if (isError) {
    return <Error title="Couldn't get current error" gameError={isError} />;
  }

  if (isLoading) {
    return <Mask width="100%" />;
  }

  const answerWidth = '30ch';

  return (
    <li className={styles.row}>
      <span style={{ width: answerWidth }}>
        {answer.isRevealed ? answer.content : <Mask width={answerWidth} />}
      </span>
      <span>
        {answer.pointesAreRevealed ? answer.points : <Mask width="4ch" />}
      </span>
    </li>
  );
}
