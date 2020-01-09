import React from "react";

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="lobby">
      <h2>Join a room</h2>
      <div className="row">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div className="row">
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      <button className="btn-login" type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
