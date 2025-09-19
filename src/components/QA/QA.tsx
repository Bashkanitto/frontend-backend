import React, { useState, useRef } from 'react';
import styles from './QA.module.css';
import minus from '../../../public/images/minus.svg';
import plus from '../../../public/images/plus.svg';

type QAProps = {
  question: string;
  answer: string;
};

function QA({ question, answer }: QAProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.acordion}>
      {/* Весь блок кликабельный */}
      <div className={styles.questionBlock} onClick={() => setOpen((v) => !v)}>
        <p>{question}</p>
        <div className={styles.round}>
          <img src={plus} alt="Expand" className={open ? styles.iconHidden : styles.iconVisible} />
          <img
            src={minus}
            alt="Collapse"
            className={open ? styles.iconVisible : styles.iconHidden}
          />
        </div>
      </div>

      <div
        className={styles.answer}
        ref={contentRef}
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default QA;
