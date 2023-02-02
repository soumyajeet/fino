import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'ageData',
  initialState: {
    value: 0,
  },
  reducers: {
    ageData: (state, action) => {
      state = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { ageData } = homeSlice.actions

export default homeSlice.reducer