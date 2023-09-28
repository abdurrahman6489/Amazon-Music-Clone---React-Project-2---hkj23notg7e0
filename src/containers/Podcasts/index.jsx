import React from "react";
import { Typography, Box } from "@mui/material";
import Category from "../AmazonMusic/components/Category";
import Loader from "../AmazonMusic/components/Loader";
import Error from "../Login/Error";
import { categoryArray } from "../AmazonMusic/constants";
import { styles } from "../AmazonMusic/components/Body/index.style";
import { useSelector } from "react-redux";
import LINKS from "../links";
import { useNavigate } from "react-router";
const Podcast = () => {
  const { loading, podcasts, error } = useSelector((state) => state.podcasts);
  const navigate = useNavigate();
  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;
  return (
    <>
      <Typography variant="h6" color="#FFF">
        PODCASTS
      </Typography>
      <Box sx={styles.BOX_STYLE}>
        {categoryArray?.map((category) => {
          const { mood, isFilter } = category;
          return (
            <Category
              mood={mood}
              songs={podcasts}
              key={mood}
              isFilter={isFilter}
              seeAllSongs={() => navigate(`${LINKS.allSongs}/mood/${mood}`)}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Podcast;
