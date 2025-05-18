import styles from './Features.module.css';

export const Features = () => (
  <section id="features" className={styles.features}>
    <h2>Возможности</h2>
    <ul className={styles.list}>
      <li>Семантический поиск по содержимому файлов</li>
      <li>Поддержка PDF, DOCX, TXT</li>
      <li>Быстрый отклик и удобный интерфейс</li>
      <li>Безопасность и приватность данных</li>
    </ul>
  </section>
);