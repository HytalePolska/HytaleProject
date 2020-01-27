import React, { Component } from 'react';


class playerform extends Component {
  constructor(props) {
    super(props);
    this.state = {Nick: '',Password:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({Nick: event.target.Nick,Password:event.target.Password});
  }
  handleSubmit(event) {
    alert('Podano następujące imię: ' + this.state.value);
    event.preventDefault();
  }
  componentDidMount() {
    fetch('/player')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <div>
        <h2>Send Player</h2>
        <form onSubmit={this.handleSubmit}>
        <label>
          Imię:
          <input type="text" value={this.state.Nick} onChange={this.handleChange} />
        </label>
        <label>
        Password:
          <input type="text" value={this.state.Password} onChange={this.handleChange} />
       </label>
        <input type="submit" value="Wyślij" />
      </form>
      </div>
    );
  }
}

export default playerform;
