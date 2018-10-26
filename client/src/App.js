import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventList from './EventList';
import EventForm from'./EventForm';
import ProfileCard from './ProfileCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
		  <ProfileCard />  
        </header>
		<EventForm />
        <EventList />
      </div>
    );
  }
}

export default App;
