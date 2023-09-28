import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { getAlbums } from "../App/features/albums/albumSlice";
import { getPodcasts } from "../App/features/Podcast/podcastSlice";
import {
  updateSavedUserDetails,
  opentheModal,
  getSavedAlbums,
  getSavedSongs,
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

export function usePodcasts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPodcasts());
  }, []);
}

export function useUserData() {
  const dispatch = useDispatch();
  const authToken = JSON.parse(localStorage.getItem("auth-token-amazon"));
  const savedUserDetails = getDecodedToken(authToken);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (savedUserDetails && Object.keys(savedUserDetails)?.length > 0) {
      dispatch(
        updateSavedUserDetails({
          ...savedUserDetails,
          authToken,
        })
      );
    }
    if (authToken) {
      dispatch(getSavedAlbums());
      dispatch(getSavedSongs());
    }
  }, []);
  useEffect(() => {
    saveToLocalStorage(getAuthTokenKey(), token);
  }, [token]);
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
