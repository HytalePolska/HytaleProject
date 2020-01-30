import React, { Component } from 'react';


class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    fetch('/players')
      .then(res => res.json())
      .then(customers => this.setState({ customers }, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (

      <div>

        <h2>Lista pobranych</h2>
        <ul>
          {this.state.customers.map(customer =>
            <li key={customer.PlayerID}>{customer.P_Name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
