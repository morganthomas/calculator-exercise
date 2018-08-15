import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { readout: '150' };
  }

  writeChar(c) {
    this.setState({ readout: this.state.readout + c });
  }

  backspace() {
    if (this.state.readout.length > 0) {
      this.setState({ readout: this.state.readout.substring(0, this.state.readout.length - 1) });
    }
  }

  clear() {
    this.setState({ readout: '' });
  }

  calculate() {
    let numSqrts = (this.state.readout.match(/√/g) || []).length;
    let preExpr = this.state.readout
      .replace(/√/g, 'Math.sqrt(')
      .replace(/(\d+\.?\d*)%/g, '($1/100.0)');
    let closeParens = [];
    for (let i = 0; i < numSqrts; i++) {
      closeParens.push(')')
    }
    let expr = preExpr + closeParens.join('');

    try {
      // eval here is not a security risk because this a pure client side app which
      // does not handle sensitive data or otherwise present an opportunity for
      // a user to hack something by executing arbitrary JavaScript on the page.
      // This app can execute invalid JavaScript if the user's input is invalid
      // but because of the try / catch it won't crash the app.
      // eslint-disable-next-line
      this.setState({ readout: eval(expr) });
    } catch (e) {
      console.error(e);
    }
  }

  handleKeyDown(event) {
    if (/[0-9+*/%.-]/.test(event.key)) {
      this.writeChar(event.key);
    } else if (event.key === 'Backspace') {
      this.backspace();
    } else if (event.key === '=' || event.key === 'Enter') {
      this.calculate();
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={(e) => this.handleKeyDown(e)} tabIndex="0">
        <div className="calculator">
          <div className="readout">{this.state.readout}</div>
            <div>
              <button onClick={() => this.writeChar('%')}>%</button>
              <button onClick={() => this.writeChar('√')}>√</button>
              <button onClick={() => this.backspace()}>B</button>
              <button onClick={() => this.clear()}>C</button>
            </div>
            <div>
              <button onClick={() => this.writeChar('+')}>+</button>
              <button onClick={() => this.writeChar('-')}>-</button>
              <button onClick={() => this.writeChar('*')}>*</button>
              <button onClick={() => this.writeChar('/')}>/</button>
            </div>
            <div>
              <button onClick={() => this.writeChar('7')}>7</button>
              <button onClick={() => this.writeChar('8')}>8</button>
              <button onClick={() => this.writeChar('9')}>9</button>
            </div>
            <div>
              <button onClick={() => this.writeChar('4')}>4</button>
              <button onClick={() => this.writeChar('5')}>5</button>
              <button onClick={() => this.writeChar('6')}>6</button>
            </div>
            <div>
              <button onClick={() => this.writeChar('1')}>1</button>
              <button onClick={() => this.writeChar('2')}>2</button>
              <button onClick={() => this.writeChar('3')}>3</button>
            </div>
            <div>
              <button onClick={() => this.writeChar('0')}>0</button>
              <button onClick={() => this.writeChar('.')}>.</button>
              <button onClick={() => this.calculate()}>=</button>
            </div>
         </div>
      </div>
    );
  }
}

export default App;
