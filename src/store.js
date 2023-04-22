import { configureStore } from '@reduxjs/toolkit'
import incomeSlice from './toolkits/slices/incomeSlice'

export const store = configureStore({
  reducer: {
    data: incomeSlice
  },
})


