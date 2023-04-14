import React from 'react';
import styles from './Question.module.css';
import { useAppDispatch, useAppSelector } from '../store/helper/hooks';
import { correctAnswer, nextPage, setTimer } from '../store/game';
import successAudio from '../assets/correct.mp3';
import failAudio from '../assets/wrong.mp3';

const Question = () => {
  const { data } = useAppSelector((state) => state.questions);
  const { page } = useAppSelector((state) => state.game);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();
  const successSound = new Audio(successAudio);
  const failSound = new Audio(failAudio);
  const liList = React.useRef<any>();
  const { time } = useAppSelector((state) => state.configs);
  const { timer } = useAppSelector((state) => state.game);
  const [pause, setPause] = React.useState(false);

  React.useEffect(() => {
    if (timer === 0) {
      setPause(true);
      liList.current.childNodes.forEach((li: HTMLLIElement) => {
        if (li.innerText === data[page].correctAnswer) {
          li.classList.add(styles.correct);
        }
        failSound.volume = 0.1;
        failSound.play();
      });
      if (page <= data.length) {
        setTimeout(() => {
          dispatch(nextPage());
          setPause(false);
        }, 1000);
      }
    }
  }, [timer]);

  React.useEffect(() => {
    dispatch(setTimer(time));
  }, [page]);

  function handleClick(event: any) {
    if (pause) return;
    dispatch(setTimer(-1));
    setPause(true);
    liList.current.childNodes.forEach((li: HTMLLIElement) => {
      if (li.innerText === data[page].correctAnswer) {
        li.classList.add(styles.correct);
      }
    });
    if (
      event.target instanceof HTMLLIElement &&
      event.target?.innerText === data[page].correctAnswer
    ) {
      successSound.volume = 0.25;
      successSound.play();
      dispatch(correctAnswer());
    }
    if (event.target?.innerText !== data[page].correctAnswer) {
      failSound.volume = 0.1;
      failSound.play();
      event.target.classList.add(styles.wrong);
      data[page].correctAnswer;
    }

    if (page <= data.length) {
      setTimeout(() => {
        dispatch(nextPage());
        setPause(false);
      }, 1000);
    }
  }

  React.useEffect(() => {
    if (data[page]) {
      let tempAnswers: string[] = [];
      tempAnswers.push(data[page].correctAnswer);
      data[page].incorrectAnswers.forEach((answer: string) =>
        tempAnswers.push(answer),
      );
      //random order of answers
      const finalAnswers = getRandom(tempAnswers);
      if (finalAnswers) setAnswers([...finalAnswers]);
    }
  }, [data, page]);

  function getRandom(array: string[]) {
    let randomAlready: number[] = [];
    let max = array.length;
    let newArray: string[] = [];
    let random: number = 0;
    random = Math.floor(Math.random() * max);
    while (randomAlready.length < max) {
      if (!randomAlready.includes(random)) randomAlready.push(random);
      else random = Math.floor(Math.random() * max);
    }
    array.forEach((item, i, array) => {
      newArray.push(array[randomAlready[i]]);
    });
    return newArray;
  }

  return (
    data[page] && (
      <section className={styles.question}>
        <div className={styles.questionBox}>
          {' '}
          <h1>{data[page].question}</h1>{' '}
        </div>
        <ul ref={liList} className={styles.alternatives}>
          {data &&
            answers.map((q) => (
              <li onClick={handleClick} key={data[page].id + q}>
                {q}
              </li>
            ))}
        </ul>
      </section>
    )
  );
};

export default Question;
