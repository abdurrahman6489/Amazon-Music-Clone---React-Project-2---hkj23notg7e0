import React, { useEffect, useState } from "react";
import "./style.css";
import { Box, Divider } from "@mui/material";

import { useParams } from "react-router-dom";

import SongDetails from "./SongDetails";
import SongList from "./SongList";
import Loader from "../AmazonMusic/components/Loader";
import Error from "../Login/Error";
import ShareModal from "./ShareModal";
import { styles } from "./index.style";

import { getSelectedAlbum } from "../../App/features/albums/selectedAlbumSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addDeleteAlbum,
  addDeleteSong,
  opentheModal,
} from "../../App/features/User/userSlice";

import { useAuthenticate } from "../../Utils/CustomHook";

const Playlist = () => {
  const authenticate = useAuthenticate();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, selectedAlbum, audioTrackIndex, error } = useSelector(
    (state) => state?.selectedAlbums
  );
  const { savedAlbums, savedSongs, isLoggedIn, songLoading, albumLoading } =
    useSelector((state) => state?.user);
  const isAlbumSaved = savedAlbums?.some(
    (savedAlbum) => savedAlbum?.albumId?._id === id && isLoggedIn
  );
  const handleAddRemoveAlbum = (albumId) => {
    if (!authenticate()) return;
    dispatch(addDeleteAlbum({ albumId }));
  };

  const addRemoveSong = (songId) => {
    if (!authenticate()) return;
    setSelectedSongId(songId);
    dispatch(addDeleteSong({ songId }));
  };

  const openModal = () => setShareModalOpen(true);
  const closeModal = () => setShareModalOpen(false);

  useEffect(() => {
    dispatch(getSelectedAlbum(id));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  const allSongs = selectedAlbum?.songs?.map((song, index) => (
    <>
      {index !== 0 && <Divider key={song.title} />}
      <SongList
        {...song}
        songNo={index + 1}
        key={song._id}
        isSongSaved={savedSongs?.some(
          (savedSong) => savedSong?.songId?._id == song._id && isLoggedIn
        )}
        addRemoveSavedData={addRemoveSong}
        audioTrackIndex={audioTrackIndex}
        loading={song._id == selectedSongId ? songLoading : false}
      />
    </>
  ));

  return (
    <>
      <ShareModal open={shareModalOpen} close={closeModal} {...selectedAlbum} />
      <Box>
        <Box
          component="div"
          sx={{
            backgroundImage: `url(${selectedAlbum.image})`,
            ...styles.IMG_CONTAINER_STYLE,
          }}
        ></Box>
        <Box component="div" sx={styles.SONG_DETAILS_STYLE}>
          <SongDetails
            {...selectedAlbum}
            isDataSaved={isAlbumSaved}
            addDeleteSavedData={handleAddRemoveAlbum}
            openModal={openModal}
            authenticate={authenticate}
            loading={albumLoading}
          />
          <Box sx={{ mt: "5vh", mb: "15vh" }}>{allSongs}</Box>
        </Box>
      </Box>
    </>
  );
};

export default Playlist;
