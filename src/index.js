import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.props.onClick;
	}

	render() {
		const spacer = this.props.value === " " ? "true" : ""
		return (
			<button
				className="square"
				spacer={spacer}
				onClick={this.onClick}
				disabled={this.props.disabled}>
				{this.props.value}
			</button>
		);
	}
}

class CharacterRow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			chars: this.props.str.split(""),
		}

		console.log("hide", this.props.hide)
		if (this.props.hide==="true")
			this.state.chars = this.state.chars.map(c => c === " " ? " " : "")
		
		console.log(this.state.chars)
	}

	handleClick (i) {
		const { chars } = this.state;
		chars[i] = "";
		this.setState({ chars });
	}

	render() {
		return (
			<div className="board-row">{
				this.state.chars.map((c, i) =>
					(<Square
						value={c}
						onClick={() => this.handleClick(i)}
						disabled={this.props.disabled}
					/>)
				)
			}</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<div className="status">Mot Mystere</div>
					<CharacterRow str="onomatopée de bébé" hide="true" disabled/>
					<div className="status">Clavier</div>
					<CharacterRow str="abcdefghi" disable="false"/>
					<CharacterRow str="jklmnopqr"/>
					<CharacterRow str="stuvwxyz"/>
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

