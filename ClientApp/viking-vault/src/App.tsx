import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginForm } from './Login'
import { HeaderForm } from './HeaderForm';
import { FooterForm } from './FooterForm';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Route path="/register/" exact component={RegisterForm} /> */}
      <Route path="/login/" exact component={LoginForm}/>
      <div className="App">
      <HeaderForm></HeaderForm>
      <FooterForm></FooterForm>
      </div>
    </Router>
  );
}

export default App;