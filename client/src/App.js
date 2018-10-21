import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventList from './EventList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
		  <EventForm />
          <EventList />
        </header>
      </div>
    );
  }
}

export default App;
