
import React from 'react';
import AudioProvider from './context/index'
import Aside from './layout/Aside';
import Home from './pages/Home';
import './styles/main.scss';


function App() {
  return (
    <div className="App">
      <AudioProvider>
        <Aside />
        <Home />
      </AudioProvider>

    </div>
  );
}

export default App;
