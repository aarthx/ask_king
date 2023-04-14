import React from 'react';
import styles from './Home.module.css';
import Button from './Button';
import { ReactComponent as Logo } from '../assets/ask_king.svg';
import { ReactComponent as King } from '../assets/king_walking.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/helper/hooks';
import { toggleMute } from '../store/game';

const Home = () => {
  const { mute } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (mute) {
      dispatch(toggleMute());
    }
  }

  return (
    <div className={`container ${styles.home}`}>
      <Logo className={styles.logo} />
      <King className={styles.king} />
      <div className={styles.homeOptions}>
        <Link to="/settings" onClick={handleClick}>
          <Button name={'play'} />
        </Link>
        <Link to="/about">
          <Button name={'about'} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
