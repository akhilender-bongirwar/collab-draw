import {configureStore} from '@reduxjs/toolkit'
import NavReducer from '@/slice/navSlice'
import ToolboxReducer from '@/slice/toolBoxSlice'

export const store = configureStore({
    reducer: {
        nav: NavReducer,
        toolbox: ToolboxReducer, 
    }
})