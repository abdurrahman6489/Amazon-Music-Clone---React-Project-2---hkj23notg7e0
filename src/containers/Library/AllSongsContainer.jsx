import React from "react";
import PlayListHeader from "./playListHeader";
import Song from "../AmazonMusic/components/Song";
import { Box, Stack, Grid } from "@mui/material";
import { styles } from "../AllSongs/index.style";

const AllSongsContainer = ({ playListName, seeAllSongs, mood, songs }) => {
  return (
    <>
      <PlayListHeader
        playListName={playListName}
        seeAllSongs={seeAllSongs}
        mood={mood}
      />
      <Box sx={styles.BOX_STYLE}>
        <Grid
          container
          columnSpacing={styles.GRID_CONTAINER_STYLE.spacing}
          rowSpacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          columns={styles.GRID_CONTAINER_STYLE.columns}
        >
          {songs?.map((song) => (
            <Grid item xs={4} sm={4} md={3} lg={2} key={song.title}>
              <Song {...song} key={song._id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AllSongsContainer;
