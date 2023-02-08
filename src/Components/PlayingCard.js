import React from "react";
import spades from "../Images/spade.png";
import hearts from "../Images/hearts.png";
import diamond from "../Images/diamond.png";
import clubs from "../Images/clubs.png";

export default class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      suits: props.suits,
    };
  }

  render() {
    const color =
      this.state.suits === "Spades" || this.state.suits === "Clubs"
        ? "textBlack"
        : "textRed";
    return (
      <div className="card">
        <div className="topLeft">
          {this.state.suits === "Spades" ? (
            <img src={spades} alt="spades"></img>
          ) : null}
          {this.state.suits === "Hearts" ? (
            <img src={hearts} alt="Hearts"></img>
          ) : null}
          {this.state.suits === "Diamonds" ? (
            <img src={diamond} alt="Diamonds"></img>
          ) : null}
          {this.state.suits === "Clubs" ? (
            <img src={clubs} alt="Clubs"></img>
          ) : null}
        </div>
        <p className={color}>{this.state.name} </p>

        <div className="bottomRight">
          {this.state.suits === "Spades" ? (
            <img src={spades} alt="spades"></img>
          ) : null}
          {this.state.suits === "Hearts" ? (
            <img src={hearts} alt="Hearts"></img>
          ) : null}
          {this.state.suits === "Diamonds" ? (
            <img src={diamond} alt="Diamonds"></img>
          ) : null}
          {this.state.suits === "Clubs" ? (
            <img src={clubs} alt="Clubs"></img>
          ) : null}
        </div>
      </div>
    );
  }
}
