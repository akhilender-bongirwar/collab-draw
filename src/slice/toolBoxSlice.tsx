import { NAV_ITEMS, NAV_ITEM_KEYS, COLORS, COLOR_KEYS } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToolBoxState = {
  [key in NAV_ITEM_KEYS]: {
    color?: COLOR_KEYS;
    size?: number;
  };
};

const initialState: ToolBoxState = {
  [NAV_ITEMS.PENCIL]: {
    color: COLORS.BLACK,
    size: 5,
  },
  [NAV_ITEMS.ERASER]: {
    color: COLORS.WHITE,
    size: 5,
  },
  [NAV_ITEMS.UNDO]: {},
  [NAV_ITEMS.REDO]: {},
  [NAV_ITEMS.DOWNLOAD]: {},
  [NAV_ITEMS.CLEAR]: {},
};

const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (
      state,
      action: PayloadAction<{ item: NAV_ITEM_KEYS; color: COLOR_KEYS }>
    ) => {
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (
      state,
      action: PayloadAction<{ item: NAV_ITEM_KEYS; size: number }>
    ) => {
      state[action.payload.item].size = action.payload.size;
    },
  },
});

export const { changeColor, changeBrushSize } = toolboxSlice.actions;

export default toolboxSlice.reducer;
