import React, {useState, useEffect} from 'react';
import './App.scss';
import CurrentGame from './components/current_game/CurrentGame';
import Settings from './components/settings/Settings';
import WagerProgessBar from './components/wager_progress_bar/WagerProgressBar';
import CookiesUtils from './utils/CookiesUtils';

type Position = {
  [id: string]: { 
    top: number,
    left: number,
   },
}

const App: React.FC = () => {

  const [token, setToken] = useState<string>(CookiesUtils.getCook("TOKEN"));
  const [wagerGoal, setWagerGoal] = useState<number>(Number(CookiesUtils.getCook("WAGER_GOAL")));
  const [positions, setPositions] = useState<Array<Position> | null>(CookiesUtils.getCook("POSITIONS") === "" ? null : JSON.parse(CookiesUtils.getCook("POSITIONS")));

  useEffect(() => {
    
    dragElement(document.getElementById("progress-bar"));
    dragElement(document.getElementById("current-game"));

  }, [positions]);

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

      
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;

      let pos:Position = {[elmnt.id]: {top: Number(elmnt.offsetTop - pos2), left: Number(elmnt.offsetLeft - pos1)}};
      updatePositions(pos)
    }
  }

  const updatePositions = (pos:Position) => {

    let newPositions:Array<Position> = []
    if(positions !== null){
      newPositions = [...positions]
      let positionToUpdate = positions.find((position:any) => String(Object.keys(position)) === String(Object.keys(pos)))

      if(positionToUpdate){
        let key = String(Object.keys(pos))
        positionToUpdate[key] = pos[key]
        newPositions = [...positions]
      }else{
        newPositions.push(pos)
      }
    }else{
      newPositions.push(pos)
    }

    setPositions(newPositions)
    CookiesUtils.setCookie("POSITIONS", JSON.stringify(newPositions), 365)
  }

  return (
    <div className="App">

      <WagerProgessBar token={token} goal={wagerGoal} positions={positions}></WagerProgessBar>

      <CurrentGame token={token} positions={positions}></CurrentGame>

      <Settings token={token} setToken={setToken} wagerGoal={wagerGoal} setWagerGoal={setWagerGoal} setPositions={setPositions}></Settings>
    </div>
  );
}

export default App;
