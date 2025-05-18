import styles from './Hero.module.css';

export const Hero = () => (
  <section className={styles.hero}>
    <h1>Поиск по файлам с семантическим анализом</h1>
    <p>Быстро находите нужную информацию в документах благодаря интеллектуальному поиску.</p>
    <button className={styles.cta}>Узнать больше</button>
  </section>
);
