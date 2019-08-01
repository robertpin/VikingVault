import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"; 
import logo from './logo.svg';
import { ProfilePage } from './ProfilePage';
import './App.css';
import "./ProfilePage.css"

const App: React.FC = () => {
  return (
    <div className="App"> 
          <Router><ProfilePage /></Router>
    </div>
  );
}

export default App;
