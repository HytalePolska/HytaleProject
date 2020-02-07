import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
class PlayerHead extends Component {
  constructor() {
    super();
  }

 

  render() {
    return (

<Card style={{ width: '12rem' }}>
  <Card.Img variant="top" src= {'https://minotar.net/avatar/'+this.props.playerData.PlayerID+'/200'} />
  <Card.Body>
    <ListGroup variant="flush">
    <ListGroup.Item><Card.Title>{this.props.playerData.P_Name}</Card.Title></ListGroup.Item>
    <ListGroup.Item>  Zgony: {this.props.playerData.PD_Deaths}</ListGroup.Item>
    <ListGroup.Item> Życia: {this.props.playerData.PD_life}</ListGroup.Item>
  </ListGroup>
  </Card.Body>
</Card>

  
    );
  }
}

export default PlayerHead;
