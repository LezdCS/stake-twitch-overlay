import React, {useEffect, useState} from 'react';
import './CurrentGame.scss'

import 'jqueryui';

type CurrentGameProps = {
  
}

const CurrentGame: React.FC<CurrentGameProps> = ({}) => {

    useEffect(()=>{
    })

  return (
    <div className='current-game'> 
      <div className='current-game__basics'>
        <p>CURRENT GAME</p>
        <p>WANTED DEAD OR ALIVE</p>
        <p>HACKSAW GAMING</p>
      </div>
      <div className='current-game__infos'>
        <p>POTENTIAL: 12500X</p>
      </div>
      <div className='current-game__personnal-best'>
        <p>BEST X: ($8) 24578.45X</p>
        <p>WIN: ($8) $14,726</p>
      </div>
    </div>
  );
}

export default CurrentGame;