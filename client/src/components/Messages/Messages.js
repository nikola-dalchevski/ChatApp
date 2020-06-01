import React from "react";
import Message from "../Message/Message";

import ScrollToBottom from "react-scroll-to-bottom";
import classes from "./messages.module.css";

const Messages = (props) => {
  return (
    <div className={classes.Container}>
      <ScrollToBottom className={classes.Container}>
        {props.messages.map((message, index) => {
          console.log("1", message);
          return (
            <div key={index} className={classes.Message}>
              <Message message={message} name={props.name} />
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
