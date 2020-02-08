import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerShow from "./Models/PlayerHead/Players_Show";
class App extends Component {


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src='https://cdn4.iconfinder.com/data/icons/minecraft-gaming-game-pixel-pixel-art/514/art_pixel_minecraft_mine_craft_axe.png' className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>

        <PlayerShow />
      </div>
    );
  }
}

export default App;
