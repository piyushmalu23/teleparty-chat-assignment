import React,{useEffect,useState} from "react";
import { TelepartyClient,SocketMessageTypes, SocketEventHandler ,SessionChatMessage} from "teleparty-websocket-lib";
// import { SessionChatMessage } from './types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Props {
  roomId: string;
  nickname: string;
  userIcon?: File;
  isCreator: boolean;
}

export default function ChatSession({ roomId, nickname,isCreator }: Props) {
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [client, setClient] = useState<TelepartyClient | null>(null);
  const [creatorRoomId,setCreatorRoomId] = useState<string>(roomId);

  useEffect(() => {

    const handler: SocketEventHandler = {

      onConnectionReady: async () => {

        //const roomId = await client?.createChatRoom(nickname);
       
        if (isCreator) {
          const newRoomId = await client?.createChatRoom(nickname);
          if(newRoomId)setCreatorRoomId(newRoomId); 
        } else {
          client?.joinChatRoom(nickname, roomId);
        }
      },
      onClose: () => alert('Connection lost'),
      // onMessage: (message) => {
      //   console.log(message,'message1234')
      //   if (message.type === SocketMessageTypes.SEND_MESSAGE) {
      //     const inChatMessage = message.data as SessionChatMessage;
      //     setMessages(prev => [...prev, inChatMessage]);
      //   }
      // }
      onMessage: (message) => {
        console.log("Incoming message →", message);
      
        if (message.type === SocketMessageTypes.SEND_MESSAGE) {
          const inChatMessage = message.data as SessionChatMessage;
          setMessages((prev) => [...prev, inChatMessage]);
        } 
      }
    };

    const newClient = new TelepartyClient(handler);
    setClient(newClient);
  }, [roomId, nickname]);

  const sendMessage = (text: string) => {
    console.log(text,'text')
    client?.sendMessage(SocketMessageTypes.SEND_MESSAGE, { body: text });
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}