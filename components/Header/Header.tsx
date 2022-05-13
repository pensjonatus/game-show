import styles from './Header.module.css';
import Left from './Left/Left';

const Header: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Left />
    </nav>
  );
};

export default Header;
