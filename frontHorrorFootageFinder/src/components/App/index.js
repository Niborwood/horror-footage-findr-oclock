import React from 'react';
import './App.scss';

import Button from '../Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing components area</h1>
        <Button textContent="Hello, je suis un bouton !" />
      </header>
    </div>
  );
}

export default App;
