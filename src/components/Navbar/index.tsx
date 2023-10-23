import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faUndo,
  faRedo,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

const Navbar: React.FC = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faUndo} className={styles.icon} />
      </div>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faRedo} className={styles.icon} />
      </div>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faDownload} className={styles.icon} />
      </div>
    </div>
  );
};

export default Navbar;
