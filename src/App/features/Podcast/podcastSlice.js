import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URLS, config } from "../../../containers/AmazonMusic/constants";

const initialState = {
  podcasts: [],
  loading: false,
  error: "",
};

export const getPodcasts = createAsyncThunk(
  "podcasts/getPodcasts",
  async (thunkAPI) => {
    try {
      const response = await axios.get(URLS.SONG_URL, config);
      const data = response.data.data;
      console.log("podcastslice ", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {},
  extraReducers: {
    [getPodcasts.pending]: (state) => {
      state.loading = true;
    },
    [getPodcasts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.podcasts = payload;
      state.error = "";
    },
    [getPodcasts.rejected]: (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    },
  },
});

export default podcastSlice.reducer;
