"use client";

import React from 'react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className={styles.landingPage}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientCircle1} />
        <div className={styles.gradientCircle2} />
        <div className={styles.gradientCircle3} />
      </div>

      {/* Floating Glass Elements */}
      <div className={styles.glassElement1} />
      <div className={styles.glassElement2} />
      <div className={styles.glassElement3} />
      <div className={styles.glassElement4} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoInner}>
              <span className={styles.logoText}>AI</span>
            </div>
          </div>
          
          <h1 className={styles.title}>DocAI</h1>
          
          <p className={styles.description}>
            Transform your documents with intelligent AI assistance
          </p>
        </div>

        {/* Start Button */}
        <button onClick={onStart} className={styles.startButton}>
          <span className={styles.buttonText}>Get Started</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(LandingPage);