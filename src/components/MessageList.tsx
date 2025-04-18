import React from 'react';
import { SessionChatMessage} from "teleparty-websocket-lib";

export default function MessageList({ messages }: { messages: SessionChatMessage[] }) {
  console.log(messages,'messages')
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.userNickname || 'Default'}</strong>: {msg.body}
          <br />
          <div>{msg.timestamp}</div>
        </div>
      ))}
    </div>
  );
}