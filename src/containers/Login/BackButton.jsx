import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";

import { useNavigate } from "react-router";
import LINKS from "../links";

import { styles } from "./backbtn.style";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton sx={styles.BACK_BTN_STYLE} onClick={() => navigate(LINKS.home)}>
      <ArrowBackIosNewIcon fontSize="small" color="primary" />
    </IconButton>
  );
};

export default BackButton;
