import React from 'react';
import './App.css';
import { RegisterForm } from "./RegisterForm";
import {LoginForm} from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserPage from './components/UserPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/register/" exact component={RegisterForm} />
        <Route path="/login/" exact component={LoginForm}/>
        <Route path="/user" component={UserPage} />
      </Router>
    </div>
  );
}

export default App;
