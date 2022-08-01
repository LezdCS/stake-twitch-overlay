import React, {useEffect, useState} from 'react';
import './WagerProgressBar.scss'

type WagerProps = {
  token: string,
  goal: number,
}

const WagerProgessBar: React.FC<WagerProps> = ({token, goal}) => {

    const [progress, setProgress] = useState<number>(0);


    useEffect(()=>{
        getWager();
        const interval = setInterval(function() {
            getWager();
        }, 2000);
    }, [])

    const getWager = () => {
        // var query = `query VipProgressMeta {
        //     user {
        //       id
        //       flagProgress {
        //         flag
        //         progress
        //         __typename
        //       }
        //       __typename
        //     }
        //   }`;
        
        // var operationName = "VipProgressMeta";
        
        // fetch('https://api.stake.bet/graphql', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': '*/*',
        //     'X-Access-Token': token,
        //     'Referer': 'https://stake.com/',
        //     'Origin': 'https://stake.com'
        //   },
        //   body: JSON.stringify({
        //     operationName,
        //     query,
        //   })
        // })
        //   .then(r => r.json())
        //   .then(data => {
        //     console.log('data returned:', data)
        //     setProgress(data.user.flagProgress.progress)
        // });

        setProgress(prev => (prev + 0.987984))
    }
     

  return (
        <div className='progress-bar'>
            <div className='progress-bar__in' style={{width: ` ${progress}%`}}></div>

            <p className='progress-bar__text'>
            ${(Math.round(goal*(progress/100) * 100) / 100).toFixed(2)} / ${goal} 
             <span className='progress-bar__text__percentage'> ({(Math.round(progress * 100) / 100).toFixed(2)}%)</span>
            </p>

        </div>
  );
}

export default WagerProgessBar;