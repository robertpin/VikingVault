import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import AccountPage from './components/AccountPage'

const App: React.FC = () => {
  return (
    <div id="App" style={{width:'100%', height:'100%'}} >
          <SideBar />
          <TopBar />
          <AccountPage />
    </div>);
}

export default App;
