import React, {useState, useEffect} from 'react';
import './App.scss';
import CurrentGame from './components/current_game/CurrentGame';
import Settings from './components/settings/Settings';
import WagerProgessBar from './components/wager_progress_bar/WagerProgressBar';

const App: React.FC = () => {

  const [token, setToken] = useState<string>(getCook("TOKEN"));
  const [wagerGoal, setWagerGoal] = useState<number>(Number(getCook("WAGER_GOAL")));

  function getCook(cookiename:string) {
    // Get name followed by anything except a semicolon
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

  return (
    <div className="App">

      <WagerProgessBar token={token} goal={wagerGoal}></WagerProgessBar>

      <CurrentGame token={token}></CurrentGame>

      <Settings token={token} setToken={setToken} wagerGoal={wagerGoal} setWagerGoal={setWagerGoal}></Settings>
    </div>
  );
}

export default App;
