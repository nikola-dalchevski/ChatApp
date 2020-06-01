import React from "react";
import classes from "./infoBar.module.css";

const InfoBar = ({ room }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Room}>
        <h3>Room: {room}</h3>
      </div>
      <div className={classes.Close}>
        <a href="/">X</a>
      </div>
    </div>
  );
};

export default InfoBar;
