import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { getAlbums } from "../App/features/albums/albumSlice";
import {
  updateSavedUserDetails,
  updateSavedAlbums,
  updateSavedSongs,
  opentheModal,
} from "../App/features/User/userSlice";
import { setAllSongs } from "../App/features/allSongs/allSongsSlice";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  getDecodedToken,
  getAuthTokenKey,
} from "./utils";
import { setMsgDisplayedFalse } from "../App/features/User/registerUserSlice";

export function useAlbums() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlbums());
  }, []);
}

export function useUserData() {
  const dispatch = useDispatch();
  const authToken = JSON.parse(localStorage.getItem("auth-token-amazon"));
  const savedUserDetails = getDecodedToken(authToken);
  const savedUserAlbums = getFromLocalStorage("authUserAlbums");
  const savedUserSongs = getFromLocalStorage("authUserSongs");

  const { token, savedAlbums, savedSongs } = useSelector((state) => state.user);

  useEffect(() => {
    if (savedUserDetails && Object.keys(savedUserDetails)?.length > 0) {
      dispatch(
        updateSavedUserDetails({
          ...savedUserDetails,
          authToken,
        })
      );
    }
    if (savedUserAlbums && savedUserAlbums?.length > 0) {
      dispatch(updateSavedAlbums({ savedAlbums: savedUserAlbums }));
    }
    if (savedUserAlbums && savedUserSongs?.length > 0) {
      dispatch(updateSavedSongs({ savedSongs: savedUserSongs }));
    }
  }, []);
  useEffect(() => {
    saveToLocalStorage(getAuthTokenKey(), token);
    saveToLocalStorage("authUserAlbums", savedAlbums);
    saveToLocalStorage("authUserSongs", savedSongs);
  }, [savedSongs, savedAlbums, token]);
}

export function useAllSongs() {
  const dispatch = useDispatch();
  const savedSongs = getFromLocalStorage("allSongs", []);
  const { allSongs } = useSelector((state) => state.allSongs);

  useEffect(() => {
    if (savedSongs?.length > 0) {
      dispatch(setAllSongs(savedSongs));
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("allSongs", allSongs);
  }, [allSongs]);
}

export function useScrolltoTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export function useMessage() {
  const dispatch = useDispatch();
  const { msgDisplayed, message } = useSelector(
    (state) => state?.registeredUser
  );
  const handleClose = () => dispatch(setMsgDisplayedFalse());
  return { msgDisplayed, message, handleClose };
}

export function useAuthenticate() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state?.user);
  const autenticate = () => {
    if (!isLoggedIn) {
      dispatch(opentheModal());
      return false;
    }
    return true;
  };
  return autenticate;
}
