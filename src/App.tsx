import React from 'react';
import './App.css';
import { Chat } from './components/Chat/Chat';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Chat />
      </div>
    );
  }
}

export default App;
