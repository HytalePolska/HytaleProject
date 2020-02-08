import React, { Component } from 'react';
import PlayerHead from './Player_head';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Jumbotron } from 'react-bootstrap';







class PlayerShow extends Component {
  constructor() {
    super();
    this.state = {

      players: [],
      players_online: []
    };
  }

  componentDidMount() {
    fetch('/plugins/kwadratowa')
      .then(res => res.json())
      .then(p => this.setState({ players: p }, () => console.log('Customers fetched...', p)));

    fetch('/players')
      .then(res => res.json())
      .then(p => this.setState({ players_online: p }, () => console.log('Customers fetched...', p)));
  }

  render() {
    return (


      <Container>
        <Jumbotron>
          <Jumbotron style={{ backgroundColor: 'gray', margin: 0 }}>Gracze Online</Jumbotron>
          <Row>
            {this.state.players_online.map(player =>
              player.P_Online ?
                <Col> <PlayerHead key={player.PlayerID} playerData={player} /></Col> : " "
            )}
          </Row>
        </Jumbotron>

        <Jumbotron>
          <Row>
            {this.state.players.map(player =>
              <Col> <PlayerHead key={player.PlayerID} playerData={player} /></Col>
            )}
          </Row>
          <h1 style={{ "color": "white", "margin": "10%" }}>Nalepszi z Nalepszych</h1>
        </Jumbotron>
      </Container>

    );
  }
}

export default PlayerShow;
