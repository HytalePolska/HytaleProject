import React, { Component } from 'react';


class playerform extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.refs.Nick.value);
        fetch('/players', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Player_ID": "1000000000000",
                "Player_Password": this.refs.Nick.value,
                "Nick": this.refs.Pass.value
            })
        }).then(res => console.log(res));


        fetch('/players')
            .then(res => res.json())
            .then(customers => this.setState({ customers }, () => console.log('Customers fetched...', customers)));
    };
    render() {
        return (

            <div id="signup">
                <form onSubmit={this.handleSubmit}>
                    <input ref="Nick" placeholder="First Name" type="text" name="first_name" /><br />
                    <input ref="Pass" placeholder="Last Name" type="text" name="last_name" /><br />
                    <button type="Submit">Start</button>
                </form>
            </div>
        )
    }
}
export default playerform;
