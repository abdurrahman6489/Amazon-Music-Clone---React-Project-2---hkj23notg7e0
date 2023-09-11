import React, { useEffect, useRef } from "react";
import { Typography, Tooltip, Modal, Box, IconButton } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { useDispatch } from "react-redux";
import { setClose } from "../../App/features/comingSoon/comingSoonSlice";

import CustomTheme from "../AmazonMusic/CustomTheme";
import { MODAL_COLOR } from "../AmazonMusic/constants";
import { styles } from "./index.style";

let timeInterval;
const FEATURECOMINGSOON = ({ open, msg, time = 3000 }) => {
  const dispatch = useDispatch();
  const timeRef = useRef();
  useEffect(() => {
    timeRef.current = setTimeout(() => {
      handleClose();
    }, time);
    return () => clearTimeout(timeRef.current);
  }, [open, timeRef.current]);

  const handleClose = () => {
    dispatch(setClose());
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomTheme {...MODAL_COLOR}>
          <Box component="div" sx={{ ...styles.MODAL_STYLE }}>
            <Typography variant="body1" color="#FFF">
              {msg || "Feature Coming Soon"}
            </Typography>
            <Tooltip onClick={handleClose} placement="bottom" title="Close">
              <IconButton size="small" color="inherit">
                <DisabledByDefaultIcon color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>
        </CustomTheme>
      </Modal>
    </>
  );
};

export default FEATURECOMINGSOON;
