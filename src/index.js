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
  return (
    <div className="grid-container" id={props.id}>{
      props.str.split("").map(c => {
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
  constructor(props) {
    super(props);

    this.state = {
      guessedChars: [" "]
    }
  }

  renderLives() {

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
        guessedChars: this.state.guessedChars.slice()
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

