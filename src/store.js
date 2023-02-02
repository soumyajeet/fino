import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './components/slice/Homeslice'

export const store = configureStore({
  reducer: {
    ageData: homeReducer
  },
})