import React from "react";
import { Link } from "react-router-dom";

import classes from "./join.module.css";

class Join extends React.Component {
  state = {
    name: "",
    room: "",
  };

  changeHandlerName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  changeHandlerRoom = (e) => {
    this.setState({
      room: e.target.value,
    });
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.CenterContainer}>
          <h1>Join</h1>
          <div className={classes.Input}>
            <input
              type="text"
              placeholder="Name"
              onChange={this.changeHandlerName}
            />
          </div>
          <div className={classes.Input}>
            <input
              type="text"
              placeholder="Room"
              onChange={this.changeHandlerRoom}
            />
          </div>
          <Link
            onClick={(event) =>
              !this.state.name || !this.state.room
                ? event.preventDefault()
                : null
            }
            to={`/chat?name=${this.state.name}&room=${this.state.room}`}
          >
            <button type="submit">SignIn</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Join;
