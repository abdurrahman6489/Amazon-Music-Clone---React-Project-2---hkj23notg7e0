import React, { useEffect, useState } from "react";
import Category from "../../AmazonMusic/components/Category";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import "./style.css";
import { styles } from "../style";

import { useNavigate } from "react-router";
import LINKS from "../../links";

import AllSongsContainer from "../AllSongsContainer";

const MyPodcast = () => {
  const [isAllSongs, setIsAllSongs] = useState(false);
  const { savedAlbums, isLoggedIn } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const allSavedAlbums = savedAlbums?.map((album) => ({ ...album.albumId }));
  useEffect(() => {
    if (!isLoggedIn) navigate(LINKS.login);
  }, [isLoggedIn]);

  return (
    <Box sx={styles.BOX_STYLE}>
      {!isAllSongs && (
        <Category
          mood={"allPodcasts"}
          songs={allSavedAlbums}
          playListName={"All Saved Podcasts"}
          key={"allPodcasts"}
          isFilter={false}
          seeAllSongs={() => setIsAllSongs((prev) => !prev)}
        />
      )}
      {isAllSongs && (
        <AllSongsContainer
          playListName="All Saved Podcasts"
          seeAllSongs={() => setIsAllSongs((prev) => !prev)}
          mood="allPodcasts"
          songs={allSavedAlbums}
        />
      )}
    </Box>
  );
};

export default MyPodcast;
