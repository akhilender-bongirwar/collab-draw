import { COLORS, COLOR_KEYS, NAV_ITEMS, NAV_ITEM_KEYS } from "@/constants";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeColor, changeBrushSize } from "@/slice/toolBoxSlice";
import cx from "classnames";

const ToolBox: React.FC = () => {
  const dispatch = useDispatch();

  const activeNavItem: NAV_ITEM_KEYS = useSelector(
    (state: any) => state.nav.activeNavItem
  );
  
  const { color, size } = useSelector((state: any) => state.toolbox[activeNavItem]);
  const showToolBox = activeNavItem === NAV_ITEMS.PENCIL;
  const showStroke =
    activeNavItem === NAV_ITEMS.PENCIL || activeNavItem === NAV_ITEMS.ERASER;

  const handleBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
     dispatch(changeBrushSize({item: activeNavItem, size: Number(e.target.value)}))
  };

  const updateColor = (color: COLOR_KEYS) => {
    dispatch(changeColor({ item: activeNavItem, color }));
  }


  return (
    <div className={styles.toolboxContainer}>
      {showStroke && (
        <div className={styles.toolItem}>
          <h4 className={styles.text}>Brush size</h4>
          <div className={styles.items}>
            <input type="range" min={1} max={10} onChange={handleBrushSize} value={size} />
          </div>
        </div>
      )}
      {showToolBox && (
        <div className={styles.toolItem}>
          <h4 className={styles.text}>Stroke Color</h4>
          <div className={styles.items}>
            <div
              className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLACK})}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updateColor(COLORS.BLACK)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active]: color === COLORS.RED})}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updateColor(COLORS.RED)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active]: color === COLORS.GREEN})}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => updateColor(COLORS.GREEN)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLUE})}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updateColor(COLORS.BLUE)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active]: color === COLORS.ORANGE})}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updateColor(COLORS.ORANGE)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active]: color === COLORS.YELLOW})}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updateColor(COLORS.YELLOW)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
