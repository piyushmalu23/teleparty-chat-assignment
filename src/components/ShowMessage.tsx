import React from "react";
import { SessionChatMessage } from "teleparty-websocket-lib";

interface Props {
  messages: SessionChatMessage[];
  currentUser: string;
}

export default function ShowMessage({ messages, currentUser }: Props) {
  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <div className="no-messages">No messages yet. Start the conversation!</div>
      ) : (
        messages.map((message) => {
          const isSystem = message.isSystemMessage;
          
          return (
            <div 
            >
              {!isSystem && (
                <div>
                  {/* {message.userIcon && (
                    <img 
                      src={message.userIcon} 
                      alt={`${message.userNickname}'s icon`} 
                      className="user-icon"
                    />
                  )} */}
                  <strong>{message.userNickname}</strong>
                </div>
              )}
              <div>{message.body}</div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}