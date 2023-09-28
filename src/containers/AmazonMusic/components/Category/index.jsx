import React, { useRef } from "react";

import { Box } from "@mui/material";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Song from "../Song";
import PlayListController from "../Body/PlaylistController";

import LINKS from "../../../links";
import { styles } from "./index.style";
const Category = ({ mood, playListName, songs, isFilter, seeAllSongs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxRef = useRef();

  let filterFunction;
  if (!isFilter) filterFunction = (song) => true;
  else if (playListName) {
    filterFunction = (song) => song.playListName === playListName;
  } else filterFunction = (song) => song.mood === mood;

  let filteredSongs = songs?.filter(filterFunction);

  const nextCards = () => {
    let width = boxRef.current.clientWidth;
    boxRef.current.scrollLeft = boxRef.current.scrollLeft + width;
  };

  const prevCards = () => {
    let width = boxRef.current.clientWidth;
    boxRef.current.scrollLeft = boxRef.current.scrollLeft - width;
  };

  return (
    <>
      <PlayListController
        playListName={playListName || ""}
        mood={mood || ""}
        next={nextCards}
        prev={prevCards}
        box={boxRef}
        seeAllSongs={seeAllSongs}
      />
      <Box component="div" sx={styles.CONTAINER_STYLE}>
        <Box sx={styles.SONG_CONTAINER_STYLE} ref={boxRef}>
          {filteredSongs?.map((song) => (
            <Song key={song._id} {...song} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Category;
