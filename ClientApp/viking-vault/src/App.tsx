import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { RegisterForm } from "./RegisterForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ResponseModal } from './ReponseModal';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/register/" exact component={RegisterForm} />
      {/* <Route path="/login/" exact component={LoginComponent}/> */}
      <div className="App">
      </div>
    </Router>
  );
}

export default App;
