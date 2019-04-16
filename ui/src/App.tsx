import * as React from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home'
import About from './About'

class App extends React.Component {

  public render() {
    return (
      <Router >
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Sauna And Sim</h1>
            <Link to="/" style={{ paddingRight: 15, color: "white" }}>Home</Link><Link to="/about" style={{ color: "white" }}>About</Link>
          </header>
        </div>
        <div>
          <Route path="/" exact={true} component={Home} />
          <Route path="/about/" component={About} />
        </div>
      </Router>
    );
  }

}

export default App;
