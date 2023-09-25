import React from "react";
import { Fab, IconButton, Typography } from "@mui/material";
import LINKS from "../../../../links";
import { useNavigate } from "react-router";
import CustomTheme from "../../../CustomTheme";
import CircularLoader from "../../../../Playlist/CircularLoader";
import { SIGN_IN_SIGN_OUT_BTN_COLOR } from "../../../constants";

import { logoutUser } from "../../../../../App/features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
const SignoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state) => state?.user);
  const handleClick = () => {
    dispatch(logoutUser());
    navigate(LINKS.login);
  };
  return (
    <CustomTheme {...SIGN_IN_SIGN_OUT_BTN_COLOR}>
      <IconButton
        onClick={handleClick}
        variant="extended"
        color="primary"
        sx={{ width: 100 }}
        key="signout"
      >
        <Typography variant="button" color="secondary">
          Sign out
        </Typography>
        {userLoading && <CircularLoader size={15} />}
      </IconButton>
    </CustomTheme>
  );
};

export default SignoutButton;
