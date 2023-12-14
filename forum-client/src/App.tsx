import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./components/routes/Home";
import './App.css';


function App() {
  const renderHome = (props: any) => <Home {...props} />;

  return (
    <Switch>
      <Route exact={true} path="/" render={renderHome} />
      <Route path="/categorythreads/:categoryId" render={renderHome} />
    </Switch>
  );
}

export default App;