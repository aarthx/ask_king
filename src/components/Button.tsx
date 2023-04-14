import React from 'react';
import styles from './Button.module.css';
import { useDispatch } from 'react-redux';
import click from '../assets/click.mp3';

const Button = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  const clicker = new Audio(click);

  return (
    <button className={styles.btn} onClick={() => clicker.play()}>
      {name}
    </button>
  );
};

export default Button;
