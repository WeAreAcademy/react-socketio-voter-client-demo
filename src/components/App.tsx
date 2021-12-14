import React, {useState} from 'react';
import './App.css';
import Candidates from './Candidates';
import FamousQuote from './FamousQuote'

function App() {
  const [shouldShowCandidates, setShouldShowCandidates] = useState(true);
  return (
    <div className="App">

      { shouldShowCandidates ?<Candidates /> : <FamousQuote /> }
      
      <button onClick={() => setShouldShowCandidates(p => !p)}>
        {shouldShowCandidates ? 'Hide':'Show'} candidates
      </button>
    </div>
  );
}


export default App;

