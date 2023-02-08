import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from "./Components/PlayingCard";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],

      player1Score: 0,
      player2Score: 0,
      player1Won: 0,
      player2Won: 0,

      roundWinner: null,
      roundsLeft: 25,
    };
  }

  resetGame = () => {
    var gameWon1 = this.state.player1Won;
    var gameWon2 = this.state.player2Won;
    if (this.state.player1Score > this.state.player2Score) {
      gameWon1++;
    } else {
      gameWon2++;
    }

    this.setState({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],

      player1Score: 0,
      player2Score: 0,
      player1Won: gameWon1,
      player2Won: gameWon2,

      roundWinner: null,
      roundsLeft: 25,
    });
  };

  dealCards = () => {
    const newCards = this.state.cardDeck.slice(-2);
    this.finishRound(newCards);

    this.setState((state) => ({
      // set state new cards to currCards
      currCards: newCards,
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
    }));
  };

  addPoints = (player) => {
    if (player === 0) {
      this.setState((state) => ({
        player1Score: state.player1Score + 1,
        roundsLeft: state.roundsLeft - 1,
        roundWinner: 0,
      }));
    }
    if (player === 1) {
      this.setState((state) => ({
        player2Score: state.player2Score + 1,
        roundsLeft: state.roundsLeft - 1,
        roundWinner: 1,
      }));
    }
    if (player === 2) {
      this.setState((state) => ({
        roundsLeft: state.roundsLeft - 1,
        roundWinner: 2,
      }));
    }
  };

  finishRound = (arr) => {
    if (arr.length !== 0) {
      this.compareCards(arr);
    }
  };

  compareCards = (arr) => {
    if (arr[0].rank > arr[1].rank) {
      this.addPoints(0);
    }
    if (arr[1].rank > arr[0].rank) {
      this.addPoints(1);
    }

    if (arr[1].rank === arr[0].rank) {
      this.addPoints(2);
    }
  };

  render() {
    const roundWinner =
      this.state.roundWinner === 2
        ? "It is a Tie"
        : `Player ${this.state.roundWinner + 1} won this round`;

    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`} className="outerCard">
        <p>Player {index + 1}</p>
        <p>
          Total games won:{" "}
          {index === 0 ? this.state.player1Won : this.state.player2Won}
        </p>
        <PlayingCard name={name} suits={suit} />
        <p>
          score :
          {index === 0 ? this.state.player1Score : this.state.player2Score}
        </p>
      </div>
    ));
    const winner =
      this.state.player1Score > this.state.player2Score
        ? "Player 1 has won the game"
        : "Player 2 Has won the game";
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <p>{this.state.roundsLeft === 0 && winner}</p>
          <div className="containter">{currCardElems}</div>
          <br />

          <button
            onClick={
              this.state.roundsLeft === 0 ? this.resetGame : this.dealCards
            }
          >
            {this.state.roundsLeft === 0 ? "Reset" : "Deal"}
          </button>
          <p>{this.state.roundWinner === null ? null : roundWinner}</p>
          <p>
            {this.state.roundWinner === null
              ? null
              : `Number of Rounds Left: ${this.state.roundsLeft}`}
          </p>
         
        </header>
      </div>
    );
  }
}

export default App;
