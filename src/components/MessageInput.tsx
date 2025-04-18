import React, { useState } from 'react';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend(text)}
      />
      <button onClick={() => {
        onSend(text);
        setText('')
        }}>Send</button>
    </div>
  );
}