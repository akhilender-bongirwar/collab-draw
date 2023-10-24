import { COLORS, NAV_ITEMS, NAV_ITEM_KEYS } from "@/constants";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

const ToolBox: React.FC = () => {
  const activeNavItem: NAV_ITEM_KEYS = useSelector(
    (state: any) => state.nav.activeNavItem
  );

  const showToolBox = activeNavItem === NAV_ITEMS.PENCIL;
  const showStroke =
    activeNavItem === NAV_ITEMS.PENCIL || activeNavItem === NAV_ITEMS.ERASER;
  const handleBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className={styles.toolboxContainer}>
      {showStroke && (
        <div className={styles.toolItem}>
          <h4 className={styles.text}>Brush size {activeNavItem}</h4>
          <div className={styles.items}>
            <input type="range" min={1} max={10} onChange={handleBrushSize} />
          </div>
        </div>
      )}
      {showToolBox && (
        <div className={styles.toolItem}>
          <h4 className={styles.text}>Stroke Color</h4>
          <div className={styles.items}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.RED }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.GREEN }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLUE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.ORANGE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.YELLOW }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
