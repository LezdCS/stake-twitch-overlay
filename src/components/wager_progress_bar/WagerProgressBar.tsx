import React, {useState} from 'react';
import './WagerProgressBar.scss'

type WagerProps = {
  token: string,
  goal: number,
}

const WagerProgessBar: React.FC<WagerProps> = ({token, goal}) => {

    const [progress, setProgress] = useState<number>(0);

    const getWager = () => {
        var query = `query VipProgressMeta {
            user {
              id
              flagProgress {
                flag
                progress
                __typename
              }
              __typename
            }
          }`;
        
        var operationName = "VipProgressMeta";
        
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
            operationName,
            query,
          })
        })
          .then(r => r.json())
          .then(data => {
            console.log('data returned:', data)
            setProgress(data.user.flagProgress.progress)
        });
    }

    getWager();
    const interval = setInterval(function() {
        getWager();
      }, 10000);
     
    // clearInterval(interval);

  return (
    <div className='wager'> 
        <p>Wager</p>
        <div className='wager__progress-bar'>
            <p>{(Math.round(progress * 100) / 100).toFixed(2)}</p>
        </div>
    </div>
  );
}

export default WagerProgessBar;