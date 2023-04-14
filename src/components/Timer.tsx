import React from 'react';
import styles from './Timer.module.css';
import { useAppDispatch, useAppSelector } from '../store/helper/hooks';
import { decTimer, setTimer } from '../store/game';

const Timer = () => {
  const { time } = useAppSelector((state) => state.configs);
  const { timer } = useAppSelector((state) => state.game);
  const watch = React.useRef<any>();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const decresce = setInterval(() => {
      dispatch(decTimer());
    }, 1000);

    if (timer === 0 || timer === -1) {
      clearInterval(decresce);
    }

    return () => {
      clearInterval(decresce);
    };
  }, [timer]);

  return (
    <div className={styles.temporizador} ref={watch}>
      <span>{timer}</span>
    </div>
  );
};

export default Timer;
