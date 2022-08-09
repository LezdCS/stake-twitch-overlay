import React, {useState, useEffect} from 'react';
import './App.scss';
import CurrentGame from './components/current_game/CurrentGame';
import Settings from './components/settings/Settings';
import WagerProgessBar from './components/wager_progress_bar/WagerProgressBar';

type Position = {
  [id: string]: { 
    top: number,
    left: number,
   },
}

const App: React.FC = () => {

  const [token, setToken] = useState<string>(getCook("TOKEN"));
  const [wagerGoal, setWagerGoal] = useState<number>(Number(getCook("WAGER_GOAL")));
  const [positions, setPositions] = useState<Array<Position> | null>( getCook("POSITIONS") === "" ? null : JSON.parse(getCook("POSITIONS")));

  useEffect(() => {
    
    dragElement(document.getElementById("progress-bar"));
    dragElement(document.getElementById("current-game"));

  }, [positions]);

  function setCookie(cName:string, cValue:string, expDays:number) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

  function getCook(cookiename:string) {
    // Get name followed by anything except a semicolon
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

  function dragElement(elmnt:any) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e:any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e:any) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

      let pos:Position = {[elmnt.id]: {top: Number(elmnt.offsetTop - pos2), left: Number(elmnt.offsetLeft - pos1)}};
      updatePositions(pos)
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const updatePositions = (pos:Position) => {

    let newPositions:Array<Position> = []
    console.log(positions)
    if(positions !== null){
      let positionToUpdate = positions.find((position:any) => String(Object.keys(position)) === String(Object.keys(pos)))
      console.log(positionToUpdate)

      if(positionToUpdate){
      }
    }else{
      newPositions.push(pos)
    }

    setPositions(newPositions)
    setCookie("POSITIONS", JSON.stringify(newPositions), 365)
  }

  return (
    <div className="App">

      <WagerProgessBar token={token} goal={wagerGoal}></WagerProgessBar>

      <CurrentGame token={token}></CurrentGame>

      <Settings token={token} setToken={setToken} wagerGoal={wagerGoal} setWagerGoal={setWagerGoal} setPositions={setPositions}></Settings>
    </div>
  );
}

export default App;
