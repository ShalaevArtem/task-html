import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>SemantiSearch</div>
    <nav className={styles.nav}>
      <a href="#features">Возможности</a>
      <a href="#screenshots">Скриншоты</a>
      <a href="#contact">Контакты</a>
    </nav>
  </header>
);
