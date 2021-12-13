import React from 'react';
import './App.css';
import ChannelsBar from './components/ChannelsBar/ChannelsBar';
import MainPersonal from './components/MainPersonal/MainPersonal';


function App() {

  const user = "Autoshiii-k";
  return (
    <div className="app">
      { user ? 
        <>
          <ChannelsBar />
          <MainPersonal />
        </>
      : 
        console.log("hi")
      }
    </div>
  );
}

export default App;
