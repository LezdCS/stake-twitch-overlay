import React, {useEffect, useState} from 'react';
import './WagerProgressBar.scss'

type WagerProps = {
  token: string,
  goal: number,
}

const WagerProgessBar: React.FC<WagerProps> = ({token, goal}) => {

    const [progress, setProgress] = useState<number>(0);
    
    useEffect(()=>{

      const interval = setInterval(() => {
        getWager();
      }, 8000);

      return () => clearInterval(interval);
    }, [token])

    const getWager = () => {
      var query = `query userRollover {
        user {
          rolloverList(limit: 10, offset: 0) {
            ...RolloverFragment
            __typename
          }
          activeRollovers {
            id
            active
            user {
              id
              __typename
            }
            amount
            lossAmount
            createdAt
            note
            currency
            expectedAmount
            expectedAmountMin
            progress
            activeBets {
              id
              iid
              game {
                id
                slug
                name
                __typename
              }
              bet {
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      
      fragment RolloverFragment on Rollover {
        id
        active
        user {
          id
          __typename
        }
        amount
        lossAmount
        createdAt
        currency
        expectedAmount
        expectedAmountMin
        progress
        note
      }`;
        
        var operationName = "userRollover";
        
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
            if(data.errors || data.data.user.activeRollovers === null){
              return
            }
            setProgress(data.data.user.activeRollovers.progress)
        });

    }
     

  return (
        <div className='progress-bar'>
            <div className='progress-bar__in' style={{width: `${progress}%`}}></div>
            <p className='progress-bar__text'>
              ${(Math.round(goal*(progress/100) * 100) / 100).toFixed(2)} / ${goal} 
              <span className='progress-bar__text__percentage'> ({(Math.round(progress * 100) / 100).toFixed(2)}%)</span>
            </p>
        </div>
  );
}

export default WagerProgessBar;