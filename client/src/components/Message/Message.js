import React from "react";

import ReactEmoji from "react-emoji";
import classes from "./message.module.css";

const Message = ({ message, name }) => {
  let isSendByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (message.user === trimmedName) {
    isSendByCurrentUser = true;
  }
  return isSendByCurrentUser ? (
    <div className={classes.FloatLeft}>
      <p className={classes.Name}>{trimmedName}</p>
      <div className={classes.Text}>
        <p>{ReactEmoji.emojify(message.text)}</p>
      </div>
    </div>
  ) : (
    <div className={classes.FloatRight}>
      <div className={classes.Text}>
        <p>{ReactEmoji.emojify(message.text)}</p>
      </div>
      <p className={classes.Name}>{message.user}</p>
    </div>
  );
};

export default Message;
