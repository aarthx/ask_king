import React from 'react';
import styles from './Quiz.module.css';
import { ReactComponent as Loading } from '../assets/loading.svg';
import { useAppDispatch, useAppSelector } from '../store/helper/hooks';
import TimeLine from './TimeLine';
import Question from './Question';
import Button from './Button';
import { Link } from 'react-router-dom';
import { resetGame } from '../store/game';
import Timer from './Timer';
import { ReactComponent as Clock } from '../assets/watch.svg';

const Quiz = () => {
  const [end, setEnd] = React.useState(false);
  const { data, loading } = useAppSelector((state) => state.questions);
  const { page, correct } = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (page > data?.length - 1) {
      setEnd(true);
    }
  }, [page]);

  if (loading) {
    return (
      <div className={`${styles.quiz} container`}>{loading && <Loading />}</div>
    );
  }
  if (end) {
    return (
      <div className={`${styles.quiz} container`}>
        {' '}
        <section className={styles.endBox}>
          <p>
            You got {correct} question(s) of {data.length} <br />
            And had a {(correct / data.length) * 100}% success rate.
          </p>
          <Link to="/" onClick={() => dispatch(resetGame())}>
            <Button name={'Play again'} />
          </Link>
        </section>
      </div>
    );
  }
  return (
    <div className={`${styles.quiz} container`}>
      <div className={styles.timer}>
        <Clock />
        <Timer />
      </div>
      <TimeLine />
      <Question />
    </div>
  );
};

export default Quiz;
