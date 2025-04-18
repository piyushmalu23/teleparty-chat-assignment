import React, { useState } from "react";

interface Props {
  onSend: (text: string) => void;
  isConnected: boolean;
}

export default function MessageInput({ onSend, isConnected }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isConnected ? "Type a message..." : "Reconnecting..."}
        disabled={!isConnected}
        className="message-input"
      />
      <button 
        type="submit" 
        disabled={!isConnected || !message.trim()} 
        className="send-button"
      >
        Send
      </button>
    </form>
  );
}