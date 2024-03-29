import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import React, { Component } from 'react';
import lottery from './lottery';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
     message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.managerAddress().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
    console.log(manager);
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transactions for success...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Transaction successful!' });
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transactions for success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'A winner has been picked!' });
  }

  render() {
    const { manager } = this.state;
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {manager}. 
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>
            <div>
              <label>Amount of ether to enter</label>
              <input 
              onChange={event => this.setState({ value: event.target.value })}
              />
            </div>
          </h4>
          <button>Enter</button>
        </form>

        <hr/>
        <hr/>

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner</button>

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
