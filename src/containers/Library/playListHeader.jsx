import React from "react";
import { Box, Stack, Typography, Fab } from "@mui/material";
import CustomTheme from "../AmazonMusic/CustomTheme";

import { BODY_PLAYLIST_BTN_COLOR } from "../AmazonMusic/constants";
import { styles } from "../AmazonMusic/components/Body/PlaylistController/index.style";

const PlayListHeader = ({ playListName, seeAllSongs, mood }) => {
  const handleClick = () => seeAllSongs();
  return (
    <Box component="div" sx={styles.CONTAINER_STYLE}>
      <Stack sx={styles.STACK_STYLE}>
        <Typography variant="h6" color="#FFF" noWrap sx={styles.TITLE_STYLE}>
          {playListName || mood}
        </Typography>

        <Box sx={styles.BTN_CONTAINER_STYLE}>
          <CustomTheme {...BODY_PLAYLIST_BTN_COLOR}>
            <Fab color="primary" variant="extended" onClick={handleClick}>
              <Typography variant="button">SEE LESS</Typography>
            </Fab>
          </CustomTheme>
        </Box>
      </Stack>
    </Box>
  );
};

export default PlayListHeader;
