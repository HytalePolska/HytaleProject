import React, { Component } from 'react';
import PlayerHead from './Player_head';

class PlayerShow extends Component {
  constructor() {
    super();
    this.state = {
      
      players: []
    };
  }

  componentDidMount() {
    fetch('/plugins/kwadratowa')
      .then(res => res.json())
      .then(players => this.setState({ players }, () => console.log('Customers fetched...', players)));
  }

  render() {
    return (
      <div>


        
          {this.state.players.map(player =>
        <PlayerHead key = {player.PlayerID} playerData = {player}/>
          )}
       
      </div>
    );
  }
}

export default PlayerShow;
