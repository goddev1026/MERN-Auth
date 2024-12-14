import React from "react";
import { AlertTemplateProps } from "react-alert";
import { makeStyles } from "@material-ui/core";
import SVG from "react-inlinesvg";

const useStyles = makeStyles(() => ({
  box: {
    boxShadow: "0 2px 2px 2px rgba(0, 0, 0, 0.03)",
    width: 320,
    ":first-child > &": {
      marginTop: "60px !important",
    },
  },
  message: {
    flex: 2,
  },
}));

const AlertTemplate: React.FC<AlertTemplateProps> = ({
  message,
  options,
  style,
  close,
}) => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.box} d-flex justify-content-between align-items-center rounded-2 bg-dark text-white mt-2 p-3`}
      style={style}
    >
      <SVG src={`/media/svg/alert-${options.type}.svg`} />
      <span className={classes.message + " text-white ms-2"}>{message}</span>
      <button
        className="text-white bg-transparent border-0 ms-3"
        onClick={close}
      >
        <SVG src={`/media/svg/alert-close.svg`} />
      </button>
    </div>
  );
};

export default AlertTemplate;
