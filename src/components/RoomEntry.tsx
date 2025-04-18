import React, { useState } from "react";

export interface JoinData {
  roomId: string;
  nickname: string;
  isCreator:boolean;
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
      <br/>
      <input
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={()=>onJoin({roomId,nickname,isCreator:false})}>Take me In!</button>
      <button onClick={()=>onJoin({roomId,nickname,isCreator:true})}>Create Room</button>
    </div>
  );
}
