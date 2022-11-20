import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchBreeds = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://dog.ceo/api/breed/hound/images');
  console.log('fetchBreeds', response.data)
  return response.data;
});

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {

    refreshBreeds(state, action) {

      const { status} = action.payload
    state.status = status;  
    
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBreeds.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        console.log('action.payload.message', action.payload.message)
        state.data = action.payload.message;
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchBreeds.fulfilled, (state, action) => {
  //     return action.payload;
  //   });
  // },
});

export const { refreshBreeds} = breedsSlice.actions;

export const selectAllBreeds = (state) => state.breeds;

export default breedsSlice.reducer;
