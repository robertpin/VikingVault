import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserPage from './components/UserPage'

const App: React.FC = () => {
  return (
    <div id="App" style={{width:'100%', height:'100%'}} >
          <UserPage />
    </div>);
}

export default App;
