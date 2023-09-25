import React from "react";
import { Box, Typography, Checkbox, Fab } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { AiFillPlayCircle } from "react-icons/ai";

import CustomTheme from "../AmazonMusic/CustomTheme";
import CircularLoader from "./CircularLoader";
import { useAuthenticate } from "../../Utils/CustomHook";

import { useSelector, useDispatch } from "react-redux";
import { setAudioTrackIndex } from "../../App/features/albums/selectedAlbumSlice";
import { setOpen } from "../../App/features/comingSoon/comingSoonSlice";

import "./style.css";

import { SONG_LIST_COLOR } from "../AmazonMusic/constants";
import { songListStyles } from "./songList.style";

const SongList = ({
  title,
  dateOfRelease,
  mood,
  thumbnail,
  audio_url,
  songNo,
  audioTrackIndex,
  _id,
  addRemoveSavedData,
  isSongSaved,
  album,
  selectedSongId,
  loading,
}) => {
  const dispatch = useDispatch();
  const authenticate = useAuthenticate();
  const isActiveSong = audioTrackIndex == songNo - 1;
  const activeColor = isActiveSong ? "secondary" : "primary";
  const iconActiveColor = isActiveSong ? "hsla(183, 71%, 50%, 0.8)" : "#FFF";
  const textActiveColor = isActiveSong ? "hsl(183, 71%, 50%)" : "#FFF";

  const addOrRemoveSong = () => {
    if (loading) return;
    addRemoveSavedData(_id);
  };

  const handleClick = (event) => {
    if (!authenticate()) return;
    if (event.target?.name == "addSongs") {
      addOrRemoveSong();
      return;
    }
    if (event.target?.name == "more") {
      dispatch(setOpen());
      return;
    }
    dispatch(setAudioTrackIndex({ audioTrackIndex: songNo - 1 }));
  };

  return (
    <CustomTheme {...SONG_LIST_COLOR}>
      <Box
        sx={{
          ...songListStyles.CONTAINER_STYLE,
          backgroundColor: isActiveSong ? "hsl(0, 0%, 10%)" : "inherit",
        }}
        name="playSong"
        onClick={handleClick}
      >
        <Box component="div" flex={1} sx={{ ml: 4 }}>
          <Typography variant="h6" color={textActiveColor}>
            {songNo}
          </Typography>
        </Box>
        <Box
          component="div"
          flex={1}
          style={songListStyles.THUMBNAIL_CONTAINER_STYLE}
        >
          <img
            src={thumbnail}
            height="50px"
            width="50px"
            style={songListStyles.THUMBNAIL_STYLE}
          />
          {isActiveSong && (
            <IconButton sx={songListStyles.PLAY_ICON_STYLE} color={activeColor}>
              <AiFillPlayCircle size={30} />
            </IconButton>
          )}
        </Box>
        <Box component="div" flex={10}>
          <Typography
            variant="h6"
            color={textActiveColor}
            sx={songListStyles.TITLE_STYLE}
          >
            {title}
          </Typography>
        </Box>
        <Box
          component="div"
          flex={4}
          sx={songListStyles.DURATION_CONTAINER_STYLE}
        >
          <Typography variant="body2" color={activeColor}>
            03 : 00
          </Typography>
        </Box>

        <Box component="div" flex={2}>
          {selectedSongId == _id && loading && <CircularLoader size={18} />}
          {!(selectedSongId == _id && loading) && (
            <Checkbox
              aria-label="Add to wishlist"
              color={activeColor}
              checked={isSongSaved}
              name="addSongs"
              icon={<AddIcon fontSize="medium" color={activeColor} />}
              checkedIcon={
                <RemoveCircleOutlineIcon
                  fontSize="medium"
                  color={activeColor}
                />
              }
            />
          )}
        </Box>
        <Box component="div" flex={2}>
          <IconButton
            aria-label="Add to wishlist"
            color={activeColor}
            name="more"
            size="large"
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>
    </CustomTheme>
  );
};

export default SongList;
