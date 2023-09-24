import React, { useEffect } from "react";
import Category from "../../AmazonMusic/components/Category";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import "./style.css";
import { styles } from "../style";

import { useNavigate } from "react-router";
import LINKS from "../../links";

const Music = () => {
  const { savedSongs, isLoggedIn } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const allSavedSongs = savedSongs?.map((song) => ({ ...song.songId }));
  useEffect(() => {
    if (!isLoggedIn) navigate(LINKS.login);
  }, [isLoggedIn]);

  return (
    <Box sx={styles.BOX_STYLE}>
      <Category
        mood={"allAlbums"}
        songs={allSavedSongs}
        playListName={"All saved Songs"}
        key={"allAlbums"}
        isFilter={false}
      />
    </Box>
  );
};

export default Music;
