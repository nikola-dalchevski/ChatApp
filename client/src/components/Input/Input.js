import React from "react";

import classes from "./input.module.css";

const Input = (props) => {
  return (
    <div className={classes.Container}>
      <input
        className={classes.Input}
        value={props.message}
        onChange={props.change}
        onKeyPress={props.keyPress}
      />
      <button
        className={classes.Button}
        id="submit"
        onClick={(e) => props.keyPress(e)}
      >
        Send
      </button>
    </div>
  );
};

export default Input;
