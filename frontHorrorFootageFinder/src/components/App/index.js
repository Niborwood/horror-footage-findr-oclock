import React from 'react';
import './App.scss';

import Quiz from '../Quiz';

/*
FAUSSES DATA POUR TEST LE COMPOSANT QUIZ
*/
const question = "Qu'est ce que la vie ?";
const answers = ['je passe', '42', "déso j'ai aqua-chèvre", 'la réponse D'];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quiz question={question} answers={answers} />
      </header>
    </div>
  );
}

export default App;
