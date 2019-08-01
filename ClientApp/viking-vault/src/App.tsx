import React from 'react';
import { ProfilePage } from './ProfilePage';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginForm } from './Login'
import { HeaderForm } from './HeaderForm';
import { FooterForm } from './FooterForm';
import "./ProfilePage.css"

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/login/" exact component={LoginForm}/>
      <div className="App">
        <HeaderForm></HeaderForm>
        <FooterForm></FooterForm>
      </div>
    </Router>
  );
}

export default App;