import React, { useEffect, useState } from "react";
import Category from "../../AmazonMusic/components/Category";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import "./style.css";
import { styles } from "../style";

import { useNavigate } from "react-router";
import LINKS from "../../links";
import AllSongsContainer from "../AllSongsContainer";

const Music = () => {
  const [isAllSongs, setIsAllSongs] = useState(false);
  const { savedSongs, isLoggedIn } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const allSavedSongs = savedSongs?.map((song) => ({ ...song.songId }));
  useEffect(() => {
    if (!isLoggedIn) navigate(LINKS.login);
  }, [isLoggedIn]);

  return (
    <Box sx={styles.BOX_STYLE}>
      {!isAllSongs && (
        <Category
          mood={"allAlbums"}
          songs={allSavedSongs}
          playListName={"All Saved Songs"}
          key={"allAlbums"}
          isFilter={false}
          seeAllSongs={() => setIsAllSongs((prev) => !prev)}
        />
      )}
      {isAllSongs && (
        <AllSongsContainer
          playListName="All Saved Songs"
          seeAllSongs={() => setIsAllSongs((prev) => !prev)}
          mood="allAlbums"
          songs={allSavedSongs}
        />
      )}
    </Box>
  );
};

export default Music;
