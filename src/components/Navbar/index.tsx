import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import {
  faPencil,
  faEraser,
  faUndo,
  faRedo,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NAV_ITEMS, NAV_ITEM_KEYS } from "@/constants";
import { navItemClick, actionItemClick } from "@/slice/navSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
   
  const activeNavItem: NAV_ITEM_KEYS = useSelector(
    (state: any) => state.nav.activeNavItem
  );
  const handleNavClick = (navItemName : NAV_ITEM_KEYS) => {
    dispatch(navItemClick(navItemName));
  }
  return (
    <div className={styles.navContainer}>
      <div className={cx(styles.iconContainer, {[styles.active]: activeNavItem === NAV_ITEMS.PENCIL})} onClick={() => handleNavClick(NAV_ITEMS.PENCIL)}>
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div className={cx(styles.iconContainer, {[styles.active]: activeNavItem === NAV_ITEMS.ERASER})} onClick={() => handleNavClick(NAV_ITEMS.ERASER)}>
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
