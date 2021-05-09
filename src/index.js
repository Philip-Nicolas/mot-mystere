import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const space = props.label === " " ? "true" : false
  return (
    <button
      className="square"
      space={space}
      onClick={() => props.onClick(props.label)}
      disabled={space || props.disabled}>
      {props.label}
    </button>
  );
}

function CharacterRow(props) {
  const chars = (props.str && props.str.split("")) || props.chars

  return (
    <div className="grid-container" id={props.id}>{
      chars.map(c => {
        // hide or show the character based on hidden/shown letters
        let disabled = (props.hide && props.hide.includes(c)) || (props.show && !props.show.includes(c));

        return (<Square
          label={disabled && props.hideDisabled ? "" : c}
          onClick={props.handleClick}
          disabled={disabled || props["read-only"] ? "true":false}
        />)
      })
    }</div>
  );
}

class Game extends React.Component {
  static startingLives = 10

  constructor(props) {
    super(props);

    this.state = {
      guessedChars: [" "],
      lives: Game.startingLives,
    }
  }

  renderLives() {
    const chars = Array(Game.startingLives + 1)
    chars.fill("💚", 0, this.state.lives)
    chars.fill("", this.state.lives, 10)
    return (
      <div>
        <div className="status">Vies: {this.state.lives}</div>
        <CharacterRow id="display" chars={chars} read-only="true"/>
      </div>
    )
  }

  renderWord() {
    return (
      <div>
        <div className="status">Mot Mystère</div>
        <CharacterRow id="display" str={this.props.str} show={this.state.guessedChars} read-only="true" hideDisabled/>
      </div>
    )
  }

  renderKeyboard() {
    const addGuessedChar = (c) => {
      const newState = {
        guessedChars: this.state.guessedChars.slice(),
        lives: this.state.lives - !this.props.str.includes(c),
      }
      newState.guessedChars.push(c)
      this.setState(newState)
    }

    return (
      <div>
        <div className="status">Clavier</div>
        <CharacterRow id="keyboard" str="abcdefghijklmnopqrstuvwxyzéàûèêçïô" handleClick={addGuessedChar} hide={this.state.guessedChars} hideDisabled/>
      </div>
    )
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          {this.renderWord()}
          {this.renderKeyboard()}
          {this.renderLives()}
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game str="onomatopée de bébé"/>
  ,
  document.getElementById('root')
);

