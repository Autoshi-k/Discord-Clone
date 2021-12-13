import React from 'react';
import './App.css';
import ServerBar from './components/ServerBar/ServerBar';
import DirectMessages from './components/DirectMessages/DirectMessages';


function App() {

  const user = "Autoshiii-k";
  return (
    <div className="app">
      { user ? 
        <>
          <ServerBar />
          <DirectMessages />
        </>
      : 
        console.log("hi")
      }
    </div>
  );
}

export default App;
