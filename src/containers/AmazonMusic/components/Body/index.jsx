import React from "react";
import Category from "../Category";

import { useSelector } from "react-redux";
import { Stack, Box } from "@mui/material";
import Loader from "../Loader";
import { categoryArray } from "../../constants";
import Error from "../../../Login/Error";
import { styles } from "./index.style";
import { useNavigate } from "react-router";
import LINKS from "../../../links";
const Body = () => {
  const { loading, albums, error } = useSelector((state) => state.albums);
  const navigate = useNavigate();
  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <Box sx={styles.BOX_STYLE}>
      {categoryArray?.map((category) => {
        const { mood, playListName, isFilter } = category;
        return (
          <Category
            mood={mood}
            songs={albums}
            playListName={playListName}
            key={mood}
            isFilter={isFilter}
            seeAllSongs={() =>
              navigate(`${LINKS.allSongs}/playListName/${playListName}`)
            }
          />
        );
      })}
    </Box>
  );
};

export default Body;
