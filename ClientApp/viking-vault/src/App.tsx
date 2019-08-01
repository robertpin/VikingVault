import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import UserPage from './components/UserPage';

const App: React.FC = () => {
  return (
    <div id="App" >
          <Router>
          <Route path = "/user" component = {UserPage}></Route>
          </Router>    
    </div>);
}

export default App;
