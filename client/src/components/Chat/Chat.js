import React from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import classes from "./chat.module.css";

let socket;

class Chat extends React.Component {
  state = {
    name: "",
    room: "",
    message: "",
    messages: [],
    users: [],
    isLoggedIn: false,
  };
  componentDidMount() {
    const { room, name } = queryString.parse(this.props.location.search);
    socket = io("localhost:5000");

    if (room != this.state.room && name != this.state.name) {
      socket.emit("join", { name, room }, () => {
        this.setState({ isLoggedIn: true });
      });
    }

    this.setState({
      name: name,
      room: room,
    });

    socket.on("roomData", (roomData) => {
      this.setState({ users: roomData.users });
    });

    socket.on("history", (messages) => {
      if (messages.messages.length) {
        const history = messages.messages
          .filter((message) => {
            return message.room === this.state.room;
          })
          .reverse();
        this.setState({ messages: history });
      }
    });

    socket.on("message", (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  keyPressed = (event) => {
    // event.preventDefault();
    if (
      (event.key === "Enter" && this.state.message) ||
      (event.target.id === "submit" && this.state.message)
    ) {
      socket.emit("sendMessage", this.state.message, () => {});
      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.ChatContainer}>
          <InfoBar room={this.state.room} />

          {!this.state.isLoggedIn ? (
            <React.Fragment>
              <Messages messages={this.state.messages} name={this.state.name} />
              <Input
                message={this.state.message}
                change={this.handleChange}
                keyPress={this.keyPressed}
              />
            </React.Fragment>
          ) : (
            <div>User with that username alredy in the room!</div>
          )}
        </div>
        <div className={classes.Online}>
          <h3 style={{ paddingLeft: "15px" }}>Online:</h3>
          {this.state.users.map((user) => {
            return (
              <div key={user.id} className={classes.User}>
                <div className={classes.Icon}></div>
                <span>{user.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Chat;
