import { Fab, Typography } from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";
import { shareModaStyles } from "./shareModal.style";
import CustomTheme from "../AmazonMusic/CustomTheme";
const CopiedLInkButton = () => {
  return (
    <Fab
      variant="extended"
      sx={{
        ...shareModaStyles.COPIED_BUTTON_STYLE,
        width: "80%",
      }}
      color="primary"
    >
      <DoneIcon color="success" />
      <Typography variant="button" sx={shareModaStyles.COPY_BTN_TEXT_STYLE}>
        Copied
      </Typography>
    </Fab>
  );
};

export default CopiedLInkButton;
