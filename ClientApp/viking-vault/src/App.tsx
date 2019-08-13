import React from 'react';
import { Router } from './Router';
import { AdminPage } from './display_user_list/AdminPage';

const App: React.FC = () => {
  return (
    <div className="App">
     <Router> </Router>
    </div>
  );
}

export default App;