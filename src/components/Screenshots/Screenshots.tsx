import styles from './Screenshots.module.css';

export const Screenshots = () => (
  <section id="screenshots" className={styles.screenshots}>
    <h2>Скриншоты</h2>
    <div className={styles.images}>
      <div className={styles.imagePlaceholder}>Здесь будет скриншот 1</div>
      <div className={styles.imagePlaceholder}>Здесь будет скриншот 2</div>
    </div>
  </section>
);