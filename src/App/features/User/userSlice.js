import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URLS, config } from "../../../containers/AmazonMusic/constants";
import { getDecodedToken } from "../../../Utils/utils";

const initialState = {
  name: "",
  email: "",
  role: "user",
  userLoading: false,
  songLoading: false,
  albumLoading: false,
  isLoggedIn: false,
  isPasswordUpdate: false,
  token: "",
  savedAlbums: [],
  savedSongs: [],
  error: "",
  modalOpen: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        URLS.SIGN_IN_AUTH_URL,
        credentials,
        config
      );
      const token = response.data.token;
      const data = getDecodedToken(token);
      console.log("from userSlice data is ", data, "token is ", token);
      return { token, data };
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePasswordRedux",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        URLS.UPDATE_PASSWORD_URL,
        credentials,
        config
      );
      const token = response.data.token;
      console.log("from userSlice data is ", "token is ", token);
      return token;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSavedAlbums = createAsyncThunk(
  "user/getSavedAlbums",
  async (thunkAPI) => {
    try {
      const response = await axios.get(URLS.SAVED_ALBUM_URL, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSavedSongs = createAsyncThunk(
  "user/getSavedSongs",
  async (thunkAPI) => {
    try {
      const response = await axios.get(URLS.SAVED_SONG_URL, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addDeleteAlbum = createAsyncThunk(
  "user/addDeleteAlbum",
  async (album, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        URLS.ADD_DELETE_ALBUM_URL,
        album,
        config
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addDeleteSong = createAsyncThunk(
  "user/addDeleteSong",
  async (song, { rejectWithValue }) => {
    try {
      const response = await axios.post(URLS.ADD_DELETE_SONG_URL, song, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSavedUserDetails: (state, action) => {
      const { name, email, authToken, role } = action.payload;
      state.name = name;
      state.email = email;
      state.token = authToken;
      state.role = role;
      state.isLoggedIn = true;
    },
    signOutUser: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.token = "";
    },
    opentheModal: (state) => {
      state.modalOpen = true;
    },
    closetheModal: (state) => {
      state.modalOpen = false;
    },
    setPasswordUpdateTrue: (state) => {
      state.isPasswordUpdate = true;
    },
    setPasswordUpdateFalse: (state) => {
      state.isPasswordUpdate = false;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.userLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
      state.error = "";
      state.modalOpen = false;
      state.isPasswordUpdate = false;
    },
    [login.rejected]: (state, { payload }) => {
      state.userLoading = false;
      state.error = payload;
    },
    [updatePassword.pending]: (state) => {
      state.userLoading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.error = "";
      state.modalOpen = false;
      state.isPasswordUpdate = false;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.userLoading = false;
      state.error = payload;
    },
    [getSavedAlbums.pending]: (state) => {
      state.albumLoading = true;
    },
    [getSavedAlbums.fulfilled]: (state, { payload }) => {
      state.albumLoading = false;
      state.error = "";
      state.savedAlbums = payload;
    },
    [getSavedAlbums.rejected]: (state, { payload }) => {
      state.albumLoading = false;
      state.error = payload;
    },
    [getSavedSongs.pending]: (state) => {
      state.songLoading = true;
    },
    [getSavedSongs.fulfilled]: (state, { payload }) => {
      state.songLoading = false;
      state.error = "";
      state.savedSongs = payload;
    },
    [getSavedSongs.rejected]: (state, { payload }) => {
      state.songLoading = false;
      state.error = payload;
    },
    [addDeleteAlbum.pending]: (state) => {
      state.albumLoading = true;
    },
    [addDeleteAlbum.fulfilled]: (state, { payload }) => {
      state.albumLoading = false;
      state.error = "";
      state.savedAlbums = payload;
    },
    [addDeleteAlbum.rejected]: (state, { payload }) => {
      state.albumLoading = false;
      state.error = payload;
    },
    [addDeleteSong.pending]: (state) => {
      state.songLoading = true;
    },
    [addDeleteSong.fulfilled]: (state, { payload }) => {
      state.songLoading = false;
      state.error = "";
      state.savedSongs = payload;
    },
    [addDeleteSong.rejected]: (state, { payload }) => {
      state.songLoading = false;
      state.error = payload;
    },
  },
});
export const {
  updateSavedUserDetails,
  signOutUser,
  opentheModal,
  closetheModal,
  setPasswordUpdateTrue,
  setPasswordUpdateFalse,
} = userSlice.actions;
export default userSlice.reducer;
