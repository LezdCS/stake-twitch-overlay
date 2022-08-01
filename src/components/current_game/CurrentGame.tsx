import React, {useEffect, useState} from 'react';
import './CurrentGame.scss'

type CurrentGameProps = {
  token: string,
}

const CurrentGame: React.FC<CurrentGameProps> = ({token}) => {

    const getUserActiveMachine = () => {
      var query = `query ????????? {
          
        }`;
      
      fetch('https://api.stake.bet/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'X-Access-Token': token,
          'Referer': 'https://stake.com/',
          'Origin': 'https://stake.com'
        },
        body: JSON.stringify({
          query,
        })
      })
        .then(r => r.json())
        .then(data => {
          console.log('data returned:', data)
      });
  }

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