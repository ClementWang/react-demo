import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { history } from './redux/store';
import logo from './logo.svg';
import './App.css';
import LearnComponent from './components/learn'
import ReadingComponent from './components/reading';

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      increaseStep: 1,
      decresseStep: 1
    };
  }

  setStep($event, key) {
    this.setState({
      [key]: +$event.target.value
    });
  }

  handleIncrease = () => {
    this.props.increase(this.state.increaseStep);
  }

  handleDecrease= () => {
    this.props.decrease(this.state.decresseStep);
  }

  componentDidMount() {
    fetch('https://marketplace-dev.svc2.eng.vmware.com/service/api/v1/products?inUse=true')
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Router history={history}>
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/learn"/>)}/>
              <Route exact path="/learn" component={LearnComponent}/>
              <Route exact path="/reading" component={ReadingComponent}/>
            </Switch>
            <Link to="/learn" className="App-link">learn</Link>
            <Link to="/reading" className="App-link">reading</Link>
          </Router>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{this.props.hello}</p>
          <div>
            <span>{this.props.total}</span>
            <div>
              <input type="text" value={this.state.increaseStep} onChange={$event => this.setStep($event, 'increaseStep')}/>
              <button onClick={this.handleIncrease}>+</button>
            </div>
            <div>
              <input type="text" value={this.state.decresseStep} onChange={$event => this.setStep($event, 'decresseStep')}/>
              <button onClick={this.handleDecrease}>-</button>
            </div>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return {
    counter: ownProps.counter,
    hello: state.rootReducer.hello,
    total: state.rootReducer.total,
    router: state.router,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    increase: step => dispatch({ type: 'increase', payload: step }),
    decrease: step => dispatch({ type: 'decrease', payload: step })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
