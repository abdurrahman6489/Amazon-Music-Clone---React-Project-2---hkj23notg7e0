import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URLS, config } from "../../../containers/AmazonMusic/constants";

const initialState = {
  allSongs: [],
  loading: false,
  error: "",
  successful: false,
};

export const getAllSongs = createAsyncThunk(
  "songs/getAllSongs",
  async (playListName, { rejectWithValue }) => {
    const filterString = JSON.stringify({ playListName: playListName });
    try {
      const response = await axios.get(
        `${URLS.ALBUM_URL}?filter=${filterString}`,
        config
      );
      const allSongs = response.data.data;
      console.log(allSongs);
      return allSongs;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const allSongsSlice = createSlice({
  name: "allSongs",
  initialState,
  reducers: {
    setAllSongs: (state, { payload }) => {
      state.allSongs = payload;
    },
  },
  extraReducers: {
    [getAllSongs.pending]: (state) => {
      state.loading = true;
      state.successful = false;
    },
    [getAllSongs.fulfilled]: (state, action) => {
      state.allSongs = action.payload;
      state.loading = false;
      state.successful = true;
      state.error = "";
    },
    [getAllSongs.rejected]: (state) => {
      state.loading = false;
      state.successful = false;
      state.error = "something went wrong";
    },
  },
});

export const { setAllSongs } = allSongsSlice.actions;
export default allSongsSlice.reducer;
