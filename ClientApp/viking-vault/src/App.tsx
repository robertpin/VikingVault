import React from 'react';
import './App.css';
import { RegisterForm } from "./RegisterForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/register/" exact component={RegisterForm} />
      </Router>
    </div>
    
  );
}

export default App;
