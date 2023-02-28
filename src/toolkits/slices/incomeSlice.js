import { createSlice } from '@reduxjs/toolkit'


const initialState = { totalIncome: 0 }

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    saveEarning(state, action) {
        state.totalIncome = action.payload;
    },
  },
})

export const { saveEarning } = incomeSlice.actions
export default incomeSlice.reducer