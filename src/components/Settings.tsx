import React from 'react';
import styles from './Settings.module.css';
import Button from './Button';
import { ReactComponent as Art } from '../assets/art.svg';
import { ReactComponent as Film } from '../assets/film.svg';
import { ReactComponent as Food } from '../assets/food.svg';
import { ReactComponent as General } from '../assets/general.svg';
import { ReactComponent as Geography } from '../assets/geography.svg';
import { ReactComponent as History } from '../assets/history.svg';
import { ReactComponent as Music } from '../assets/music.svg';
import { ReactComponent as Science } from '../assets/science.svg';
import { ReactComponent as Social } from '../assets/social.svg';
import { ReactComponent as Sport } from '../assets/sport.svg';
import { ReactComponent as Plus } from '../assets/plus.svg';
import { ReactComponent as Minus } from '../assets/minus.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAllCategories, setConfigs } from '../store/configs';
import { fetchQuestions } from '../store/questions';
import { updateTags } from '../store/url';
import { useAppDispatch, useAppSelector } from '../store/helper/hooks';
import { RootState } from '../store/configureStore';
import { setTimer } from '../store/game';

const Settings = () => {
  const [questions, setQuestions] = React.useState(5);
  const [time, setTime] = React.useState(10);
  const [difficulty, setDifficulty] = React.useState('');
  const [categories, setCategories] = React.useState<string[]>([]);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setConfigs({ questions, time, difficulty, categories }));
    dispatch(
      updateTags({ categories, questionsNumber: questions, difficulty }),
    );
    if (categories.length === 0) {
      dispatch(setAllCategories());
      dispatch(
        updateTags({ categories: [], questionsNumber: questions, difficulty }),
      );
    }
  }, [questions, time, difficulty, categories]);

  const difficultyList = React.useRef<HTMLUListElement>(null);
  const categoriesList = React.useRef<HTMLUListElement>(null);

  const { finalUrl } = useAppSelector((state) => state.url);

  function handleClick() {
    dispatch(setTimer(time));
    dispatch(fetchQuestions(finalUrl));
  }

  function toggleActive(target: HTMLLIElement) {
    target.classList.toggle(styles.active);
  }

  function cleanActiveList(target: HTMLLIElement) {
    target.parentNode?.childNodes.forEach((li) => {
      if (li instanceof HTMLLIElement) {
        li.classList.remove(styles.active);
      }
    });
  }

  function controlCategories(target: HTMLLIElement) {
    if (target.childNodes[1] instanceof HTMLParagraphElement) {
      if (
        target.classList.contains(styles.active) &&
        target.childNodes[1] instanceof HTMLParagraphElement &&
        !categories.includes(target.childNodes[1].innerText)
      ) {
        let text = target.childNodes[1].innerText
          .toLowerCase()
          .replaceAll(' ', '_')
          .replaceAll('&', 'and');
        setCategories([...categories, text]);
      } else if (!target.classList.contains(styles.active)) {
        let text = target.childNodes[1].innerText
          .toLowerCase()
          .replaceAll(' ', '_')
          .replaceAll('&', 'and');
        let newArray = categories.filter((item) => item !== text);
        setCategories(newArray);
      }
    }
  }

  function difficultyChange(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    if (
      e.currentTarget instanceof HTMLLIElement &&
      e.currentTarget.innerText !== difficulty
    ) {
      cleanActiveList(e.currentTarget);
      toggleActive(e.currentTarget);
      if (e.currentTarget.classList.contains(styles.active)) {
        setDifficulty(`${e.currentTarget.innerText}`);
      }
    } else if (
      e.currentTarget instanceof HTMLLIElement &&
      e.currentTarget?.classList.contains(`${styles.active}`)
    ) {
      cleanActiveList(e.currentTarget);
      setDifficulty('');
    }
  }

  return (
    <div className={`${styles.settings} container`}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.categories}>
        <ul ref={categoriesList}>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Art />
            <p>Arts & Literature</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Film />
            <p>Film & TV</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Food />
            <p>Food & Drink</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <General />
            <p>General Knowledge</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Geography />
            <p>Geography</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <History />
            <p>History</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Music />
            <p>Music</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Science />
            <p>Science</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Social />
            <p>Society & Culture</p>
          </li>
          <li
            onClick={(e) => {
              toggleActive(e.currentTarget);
              controlCategories(e.currentTarget);
            }}
          >
            <Sport />
            <p>Sport & Leisure</p>
          </li>
        </ul>
      </div>
      <div className={styles.lastRowContainer}>
        <div className={styles.options}>
          <div className={styles.optionsDif}>
            <p>Difficulty:</p>
            <ul ref={difficultyList}>
              <li onClick={difficultyChange}>easy</li>
              <li onClick={difficultyChange}>medium</li>
              <li onClick={difficultyChange}>hard</li>
            </ul>
          </div>
          <div className={styles.optionsQt}>
            <p>
              Questions:{' '}
              <Minus
                onClick={() => {
                  if (questions > 5) {
                    setQuestions((questions) => questions - 1);
                  }
                }}
              />{' '}
              {questions}{' '}
              <Plus
                onClick={() => {
                  if (questions < 20) {
                    setQuestions((questions) => questions + 1);
                  }
                }}
              />
            </p>
            <p>
              Time:{' '}
              <Minus
                onClick={() => {
                  if (time > 5) {
                    setTime((time) => time - 1);
                  }
                }}
              />{' '}
              {time}{' '}
              <Plus
                onClick={() => {
                  if (time < 20) {
                    setTime((time) => time + 1);
                  }
                }}
              />
            </p>
          </div>
        </div>
        <Link to="/play" onClick={handleClick}>
          <Button name={'start'}></Button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
