import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  totalIncome: 0,
  needData: {}
}

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    saveEarning(state, action) {
      state.totalIncome = action.payload
    },
    saveNeededAmount(state, action) {
      state.needData = action.payload;
    },
  },
})

export const { saveEarning, saveNeededAmount } = incomeSlice.actions
export default incomeSlice.reducer