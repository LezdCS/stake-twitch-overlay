import React from 'react';
import './App.scss';
import WagerProgessBar from './components/wager_progress_bar/WagerProgressBar';

const App: React.FC = () => {
  return (
    <div className="App">

      <WagerProgessBar token={process.env.REACT_APP_TOKEN!} goal={45000}></WagerProgessBar>

    </div>
  );
}

export default App;
