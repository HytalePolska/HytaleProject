import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col } from 'react-bootstrap';
import FaBeer from 'react-icons/lib/fa/heart';
import FaRegDizzy from "react-icons/lib/ti/directions";

class PlayerHead extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  _MouseOver = (e) => {
    this.state.show = true;
    console.log('dupa')
  }

  render() {

    return (

      <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src={'https://minotar.net/avatar/' + this.props.playerData.PlayerID + '/200'} onMouseOver={this._MouseOver} onMouseLeave={this._MouseOver} />
        <Card.Header className="text-uppercase">{this.props.playerData.P_Name}</Card.Header>
        {
          this.state.show ?
            <Card.Body style={{ " text-align": "center" }}>
              <FaBeer size={25} />
              <h5>{this.props.playerData.PD_Deaths + 100}</h5>
            </Card.Body> : null
        }

      </Card>


    );
  }
}

export default PlayerHead;
