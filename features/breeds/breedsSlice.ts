import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchBreeds = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://dog.ceo/api/breed/hound/images')
  return response.data
})

const breedsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBreeds.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default breedsSlice.reducer
