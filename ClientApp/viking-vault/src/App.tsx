import React from 'react';
import { ProfilePage } from './ProfilePage';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginForm } from './Login'
import "./ProfilePage.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/login/" exact component={LoginForm}/>
      </Router>
    </div>
  );
}

export default App;