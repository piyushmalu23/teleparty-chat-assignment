import React,{useEffect,useState} from "react";
import { TelepartyClient,SocketMessageTypes, SocketEventHandler ,SessionChatMessage,MessageList} from "teleparty-websocket-lib";
// import { SessionChatMessage } from './types';
import ShowMessage from './ShowMessage';
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
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleIncomingMessage = (message: any) => {
    console.log("Incoming ", message);

    if (message.type === SocketMessageTypes.SEND_MESSAGE) {
      const chatMessage = message.data as SessionChatMessage;
      setMessages((prev) => [...prev, chatMessage]);
    }
  };

  useEffect(() => {

    const eventHandler: SocketEventHandler = {

      onConnectionReady: async () => {

        //const roomId = await client?.createChatRoom(nickname);
        console.log(" WebSocket is ready");
        setIsConnected(true);
       
        if (isCreator) {
          const newRoomId = await client?.createChatRoom(nickname);
          if(newRoomId)setCreatorRoomId(newRoomId); 
        } else {
          const onJoinMessage:MessageList|undefined=await client?.joinChatRoom(nickname, roomId);
          setMessages( onJoinMessage?.messages || [])

        }
      },

      onMessage: (message) => {
        handleIncomingMessage(message);
      
        // if (message.type === SocketMessageTypes.SEND_MESSAGE) {
        //   const inChatMessage = message.data as SessionChatMessage;
        //   setMessages((prev) => [...prev, inChatMessage]);
        // } 
      },
      onClose: () => {
        setIsConnected(false);
        alert("Connection lost. refresh.");
      },
    };

    const newClient = new TelepartyClient(eventHandler);
    setClient(newClient);
  }, [roomId, nickname,isCreator]);

  const sendMessage = (text: string) => {
    if (!client || !isConnected || !text.trim()) return;

    const tempMessage: SessionChatMessage = {
      body: text,
      isSystemMessage: false,
      userNickname: nickname,
      permId: Math.random().toString(36).substring(2),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, tempMessage]);
    // client.sendMessage(SocketMessageTypes.SEND_MESSAGE, { body: text });

    // handleIncomingMessage({
    //   type: SocketMessageTypes.SEND_MESSAGE,
    //   data: tempMessage,
    // });
  };
  return (
    <div>
       {isConnected ? " Connected" : " Disconnected"}
      <ShowMessage messages={messages} currentUser={nickname}/>
      <MessageInput onSend={sendMessage} isConnected={isConnected} />
    </div>
  );
}