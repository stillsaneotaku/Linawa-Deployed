import React from 'react';
import styles from './PolicyCard.module.css';

const PolicyCard = ({ policy, onSummarize, summary, loading }) => {
  return (
    <div className={styles.accordion-item}>
      <h2 className={styles.accordion-header}>
      <button
          className={`${styles.accordionButton} accordion-button collapsed`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${policy.key}`}
          aria-expanded="false"
          aria-controls={`collapse-${policy.key}`}
>
          {policy.title}
        </button>
      </h2>
      <div
        id={`collapse-${policy.key}`}
        className={`${styles.accordionCollapse} accordion-collapse collapse`}
        data-bs-parent="#accordionExample"
      >
        <div className={styles.accordion-body}>
          {/* Split long text into multiple paragraphs */}
          {policy.text.split('\n\n').map((para, index) => (
            <p key={index} className={styles.policyText}>{para}</p>
          ))}

          {policy.showSummarize && (
            <>
              {loading ? (
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.mt2}`} disabled>Summarizing...</button>
              ) : (
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.mt2}`} onClick={() => onSummarize(policy.key, policy.text)}>
                  Summarize
                </button>
              )}
              {summary && (
                <p className={styles.summaryText}>
                  <span className={styles.summaryTitle}>Summary:</span> {summary}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
