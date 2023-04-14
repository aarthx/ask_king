import React from 'react';
import styles from './TimeLine.module.css';
import { useAppSelector } from '../store/helper/hooks';
import { triviaAPIObject } from '../store/questions';

const TimeLine = () => {
  const { data, loading } = useAppSelector((state) => state.questions);
  const { page } = useAppSelector((state) => state.game);

  return (
    <ul className={styles.timeline}>
      {data?.map((item: triviaAPIObject, index: number) => (
        <li key={item.id} className={index <= page ? styles.active : ''}></li>
      ))}
    </ul>
  );
};

export default TimeLine;
