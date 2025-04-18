import React, { useState } from "react";

export interface JoinData {
  roomId: string;
  nickname: string;
}

export default function RoomEntry({
  onJoin,
}: {
  onJoin: (data: JoinData) => void;
}) {
  const [roomId, setRoomId] = useState("");
  const [nickname, setNickname] = useState("");

  return (
    <div>
      <div>Create a New Room or Join existing Room</div>
      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={()=>onJoin({roomId,nickname})}>Take me In!</button>
    </div>
  );
}
