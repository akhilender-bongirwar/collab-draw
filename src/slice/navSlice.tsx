import { NAV_ITEMS, NAV_ITEM_KEYS } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  activeNavItem: NAV_ITEM_KEYS;
  actionNavItem: NAV_ITEM_KEYS | null;
}

const initialState: NavState = {
  activeNavItem: NAV_ITEMS.PENCIL,
  actionNavItem: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    navItemClick: (state, action: PayloadAction<NAV_ITEM_KEYS>) => {
      state.activeNavItem = action.payload;
    },
    actionItemClick: (state, action: PayloadAction<NAV_ITEM_KEYS | null>) => {
      state.actionNavItem = action.payload;
    },
  },
});

export const { navItemClick, actionItemClick } = navSlice.actions;

export default navSlice.reducer;
