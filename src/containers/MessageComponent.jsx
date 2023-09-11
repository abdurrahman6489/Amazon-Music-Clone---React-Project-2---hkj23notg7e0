import React from "react";
import { Snackbar } from "@mui/material";

const MessageComponent = ({ open, setOpen, msg, time }) => {
  const handleClose = () => setOpen();

  return (
    <Snackbar
      open={open}
      autoHideDuration={time}
      onClose={handleClose}
      message={msg}
    />
  );
};

export default MessageComponent;
