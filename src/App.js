import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, NavLink, Redirect, Prompt} from 'react-router-dom'
import User from './components/User/User';

class App extends Component {

  state = {
    loggedIn: false
  }

  loginHandle = () => {
    this.setState(prevState => ({loggedIn: !prevState.loggedIn}))
  }

  render(){
    return (
      <Router>
        <div className="App">
          <ul>
            <li><NavLink to="/" exact activeStyle={{color:'green'}}>Home</NavLink></li>
            <li><NavLink to="/about" exact activeStyle={{color:'green'}}>About</NavLink></li>
            <li><NavLink to="/users/praveen" exact activeStyle={{color:'green'}}>User Praveen</NavLink></li>
          </ul>
          <Prompt when={!this.state.loggedIn} message={(location) => {
            return location.pathname.startsWith('/users') ? "Are you sure": true
          }} />
          <input type="button" value={this.state.loggedIn ? "logout":"login"} onClick={this.loginHandle.bind(this)} />
          <Route path="/" exact strict render={
            () => {
              return(<h1>Welcome Home</h1>)
            }
          }/>

          <Route path="/about" exact strict render={
            () => {
              return(<h1>Welcome About</h1>)
            }
          }/>

          <Route path="/users/:username" exact strict render={({match}) => (
            this.state.loggedIn ? (<User username={match.params.username}/>) : (<Redirect to="/" />)
          )}/>

        </div>
      </Router>
    )
  }
}

export default App;
