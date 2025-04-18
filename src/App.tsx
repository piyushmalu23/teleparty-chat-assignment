import React, {useState} from 'react';
import RoomEntry,{JoinData} from './components/RoomEntry';
import './App.css';


function App() {
  const [room,setRoom] = useState<JoinData|null>(null);
  return (
    <div className="App">
      {
        room?(
          <></>
        ):(
          <RoomEntry onJoin={(data)=>setRoom(data)}/>
        )
      }
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
