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
      
        <Container>
            <Jumbotron>
            <Row>
            {this.state.players.map(player =>
           <Col> <PlayerHead key = {player.PlayerID} playerData = {player}/></Col>
          )}
            </Row>
             <h1 style={{"color":"white","margin":"10%"}}>Nalepszi z Nalepszych</h1>
            </Jumbotron>
        </Container>  
   
    );
  }
}

export default PlayerShow;
