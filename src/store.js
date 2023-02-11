import { configureStore } from '@reduxjs/toolkit'
import needSlice from './components/slice/needSlice'

export const store = configureStore({
  reducer: {
    neededExpense: needSlice
  },
})


