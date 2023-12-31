import { MAKE_DISPLAY } from "../../../../Utils/utils";

export const STACK_STYLE = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItem: "flex-start",
  gap: "1em",
};

export const SIDE_CONTAINER_STYLE = MAKE_DISPLAY(
  "none",
  "none",
  "block",
  "block"
);

export const BOX_STYLE = {
  width: "100%",
  p: { xs: 0, sm: 0, md: 0, lg: 4 },
  mb: { xs: 12, sm: 8, md: 8, lg: 8 },
};

export const styles = {
  STACK_STYLE,
  SIDE_CONTAINER_STYLE,
  BOX_STYLE,
};
