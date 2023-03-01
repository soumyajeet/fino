import { createSlice } from '@reduxjs/toolkit'


const initialState = 0;

const needSlice = createSlice({
  name: 'needed',
  initialState,
  reducers: {
    saveNeededAmount(state, action) {
        state = action.payload;
    },
  },
})

export const { saveNeededAmount } = needSlice.actions
export default needSlice.reducer