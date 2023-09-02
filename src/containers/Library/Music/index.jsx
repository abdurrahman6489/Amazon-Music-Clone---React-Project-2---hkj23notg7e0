import React from "react";
import Category from "../../AmazonMusic/components/Category";
import { useSelector } from "react-redux";
import { Stack, Box } from "@mui/material";
import "./style.css";
const Music = () => {
  const { savedSongs } = useSelector((state) => state.user);
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        mt: "1vh",
        mb: "8vh",
      }}
    >
      <Box flex={1}></Box>
      <Box
        flex={50}
        sx={{ border: "1px solid black", maxWidth: "92dvw", p: 5 }}
      >
        <Category
          mood={"allAlbums"}
          songs={savedSongs}
          playListName={"All saved Albums"}
          key={"allAlbums"}
          isFilter={false}
        />
      </Box>
      <Box flex={1}></Box>
    </Stack>
  );
};

export default Music;
