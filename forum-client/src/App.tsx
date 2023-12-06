import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
// import leftMenu from "./components/LeftMenu";

function App() {
  return (
    // <Switch>
    //   <Route exact={true} path="/" component={leftMenu} />
    // </Switch>
    <div className="App">
      <nav className="navigation">Nav</nav>
      <div className="sidebar">Sidebar</div>
      <div className="leftmenu">Left Menu</div>
      <main className="content">Main</main>
      <div className="rightMenu">Right Menu</div>
    </div>
  );
}

export default App;
