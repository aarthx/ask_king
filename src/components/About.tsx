import React from 'react';
import styles from './About.module.css';
import { Link } from 'react-router-dom';
import Button from './Button';

const About = () => {
  return (
    <div className={`${styles.about} container`}>
      {' '}
      <section className={styles.aboutBox}>
        <p className={styles.title}>
          Made by <span>King Arthur</span> , 2023
        </p>
        <p>
          Portfolio:{' '}
          <a target="_blank" href="https://aarthx.github.io">
            aarthx.github.io
          </a>
        </p>
        <p>
          Email:{' '}
          <a target="_blank" href="mailto:arthuraugusto.exe@gmail.com">
            arthuraugusto.exe@gmail.com
          </a>
        </p>
        <p>
          Github:{' '}
          <a target="_blank" href="https://github.com/aarthx">
            github.com/aarthx
          </a>
        </p>
        <p>
          LinkedIn:{' '}
          <a target="_blank" href="https://www.linkedin.com/in/arthur-augusto/">
            linkedin.com/in/arthur-augusto/
          </a>
        </p>
      </section>
      <Link to="/">
        <Button name={'Return'} />
      </Link>
    </div>
  );
};

export default About;
