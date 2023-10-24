import {configureStore} from '@reduxjs/toolkit'
import NavReducer from '@/slice/navSlice'

export const store = configureStore({
    reducer: {
        nav: NavReducer 
    }
})