import { Box, Stack, Grid } from "@mui/material";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getAllSongs } from "../../App/features/allSongs/allSongsSlice";
import Song from "../AmazonMusic/components/Song";
import CircularLoader from "../Playlist/CircularLoader";
import Error from "../Login/Error";
import "./style.css";
import { styles } from "./index.style";
const AllSongs = () => {
  const { allSongs, loading, error } = useSelector((state) => state?.allSongs);
  const { playListName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongs(playListName));
  }, []);

  if (loading) return <CircularLoader size={50} />;
  if (error) return <Error msg={error} />;
  return (
    <Box sx={styles.BOX_STYLE}>
      <h1 style={styles.TITLE_STYLE}>All Songs</h1>
      <Grid
        container
        columnSpacing={styles.GRID_CONTAINER_STYLE.spacing}
        rowSpacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={styles.GRID_CONTAINER_STYLE.columns}
      >
        {allSongs?.map((song) => (
          <Grid item xs={4} sm={4} md={3} lg={2} key={song.title}>
            <Song {...song} key={song._id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllSongs;
