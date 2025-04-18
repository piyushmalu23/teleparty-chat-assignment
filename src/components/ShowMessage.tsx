import React from 'react';
import { SessionChatMessage} from "teleparty-websocket-lib";

export default function ShowMessage({ messages }: { messages: SessionChatMessage[] }) {
  console.log(messages,'messages')
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.userNickname || 'Default'}</strong>: {msg.body}
          <br />
          <div>{new Date(msg.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
}