import React from 'react';
import logo from './logo.svg';
import './App.css';
import {generateAbilities} from "./generateAbilities";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {generateAbilities(72, 6, 17, 6, 100)}*/}
        Ability points
        <label>
          Total:
          <input type="text" name="name"/>
        </label>
        Ability score minimum and maximum
        <label>
          Minimum:
          <input type="text" name="name"/>
          Maximum:
          <input type="text" name="name"/>
        </label>
        <button type="button">Click Me!</button>
      </header>
    </div>
  );
}

export default App;
