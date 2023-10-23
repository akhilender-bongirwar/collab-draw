import { COLORS } from "@/constants";
import styles from "./index.module.css";

const ToolBox: React.FC = () => {
  const handleBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className={styles.toolboxContainer}>
      <div className={styles.toolItem}>
        <h4 className={styles.text}>Brush size</h4>
        <div className={styles.items}>
          <input type="range" min={1} max={10} onChange={handleBrushSize} />
        </div>
      </div>
      <div className={styles.toolItem}>
        <h4 className={styles.text}>Stroke Color</h4>
        <div className={styles.items}>
          <div className={styles.colorBox} style={{backgroundColor: COLORS.BLACK}} />
          <div className={styles.colorBox} style={{backgroundColor: COLORS.RED}} />
          <div className={styles.colorBox} style={{backgroundColor: COLORS.GREEN}} />
          <div className={styles.colorBox} style={{backgroundColor: COLORS.BLUE}} />
          <div className={styles.colorBox} style={{backgroundColor: COLORS.ORANGE}} />
          <div className={styles.colorBox} style={{backgroundColor: COLORS.YELLOW}} />
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
