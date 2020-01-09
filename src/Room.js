import React, { useState, useEffect } from 'react';
import Participant from './Participant';
const { connect } = require('twilio-video');

const Room = ({ roomName, token, handleLogout }) => {

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  var constraints = {audio: false, video: true};
  var video = document.querySelector("video");

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    navigator.getUserMedia(constraints, success => {
      connect(token, {
        name: roomName
      }).then(room => {
        console.log("Video connect to room: => ",room);
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);
      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`);
      });
    }, error => {
      alert("Không tìm thấy webcam!")
      console.log("navigator.getUserMedia error: ", error);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  },  [roomName, token]);

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout} className="btn-logout">Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );

};

export default Room;