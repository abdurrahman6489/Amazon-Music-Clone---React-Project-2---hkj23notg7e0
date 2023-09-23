import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import {
  Typography,
  Fab,
  Tooltip,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { FacebookRounded, Twitter } from "@mui/icons-material";

import CustomTheme from "../AmazonMusic/CustomTheme";
import CopiedLinkButton from "./CopiedLInkButton";
import { MODAL_COLOR, MODAL_STYLE } from "../AmazonMusic/constants";
import { setOpen } from "../../App/features/comingSoon/comingSoonSlice";
import { useDispatch } from "react-redux";

import {
  shareOnTwitter,
  copyToClipboard,
  shareOnFacebook,
} from "../../Utils/utils";
import { URLS } from "../AmazonMusic/constants";
import { shareModaStyles } from "./shareModal.style";

const ShareModal = ({ open, close, album }) => {
  const { title, description, image, _id } = album || {};
  const [copiedLinkOpen, setCopiedLinkOpen] = useState(false);
  const openRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const handleClose = () => close();

  useEffect(() => {
    openRef.current = setTimeout(() => {
      setCopiedLinkOpen(false);
    }, 2000);
    return () => clearTimeout(openRef.current);
  }, [copiedLinkOpen]);

  const faceBookShare = () => {
    shareOnFacebook(title, URLS.BASE_URL + pathname);
  };

  const twitterShare = () => {
    shareOnTwitter(title, URLS.BASE_URL + pathname);
  };

  const handleCopiedLink = () => {
    copyToClipboard(URLS.BASE_URL + pathname);
    setCopiedLinkOpen(true);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ ...MODAL_STYLE, ...shareModaStyles.MODAL_STYLE }}
          disableScrollLock={true}
        >
          <CustomTheme {...MODAL_COLOR}>
            <Box sx={shareModaStyles.CONTAINER_STYLE}>
              <Box component="div" sx={shareModaStyles.CLOSE_BTN_STYLE}>
                <Typography
                  variant="h5"
                  component="h2"
                  color="secondary"
                  sx={shareModaStyles.PLAYLIST_HEADING_STYLE}
                >
                  Share this playlist
                </Typography>
                <Tooltip onClick={handleClose} placement="top" title="Close">
                  <IconButton size="small" color="inherit">
                    <DisabledByDefaultIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box component="div" sx={shareModaStyles.IMG_CONTAINER_STYLE}>
                <Box
                  component="div"
                  sx={{
                    ...shareModaStyles.IMG_STYLE,
                    backgroundImage: `url(${image})`,
                  }}
                ></Box>
                <Box
                  component="div"
                  sx={shareModaStyles.DETAIL_CONTAINER_STYLE}
                >
                  <Typography
                    variant="h6"
                    color="rgb(37, 209, 218)"
                    sx={shareModaStyles.DETAIL_STYLE}
                  >
                    Album
                  </Typography>
                  <Typography
                    variant="body1"
                    color="#FFF"
                    noWrap
                    sx={{ width: 200, ...shareModaStyles.TITLE_STYLE }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.6)"
                    sx={{ ...shareModaStyles.TITLE_STYLE }}
                  >
                    {description}
                  </Typography>
                </Box>
              </Box>
              <Box component="div" sx={{ width: "100%", mt: 2 }}>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                  Share link
                </Typography>
                <Typography variant="body2" color="#FFF" sx={{ width: "90%" }}>
                  {URLS.BASE_URL + pathname}
                </Typography>
              </Box>
              <Box component="div" sx={shareModaStyles.BTN_CONTAINER_STYLE}>
                <Box flex={4}>
                  <Fab
                    size="small"
                    sx={{
                      ...shareModaStyles.BUTTON_STYLE,
                      mr: 2,
                    }}
                    onClick={twitterShare}
                  >
                    <Twitter />
                  </Fab>
                  <Fab
                    size="small"
                    sx={shareModaStyles.BUTTON_STYLE}
                    onClick={faceBookShare}
                  >
                    <FacebookRounded />
                  </Fab>
                </Box>
                <Box flex={2}>
                  {!copiedLinkOpen && (
                    <Fab
                      variant="extended"
                      sx={{
                        ...shareModaStyles.BUTTON_STYLE,
                        width: "80%",
                      }}
                      onClick={handleCopiedLink}
                    >
                      <CopyAllIcon />
                      <Typography
                        variant="button"
                        sx={shareModaStyles.COPY_BTN_TEXT_STYLE}
                      >
                        Copy link
                      </Typography>
                    </Fab>
                  )}
                  {copiedLinkOpen && <CopiedLinkButton />}
                </Box>
              </Box>
            </Box>
          </CustomTheme>
        </Box>
      </Modal>
    </>
  );
};

export default ShareModal;
