import React, {useEffect, useState} from 'react';
import './Settings.scss'
import CookiesUtils from '../../utils/CookiesUtils';

type SettingsProps = {
    token: string,
    setToken: Function,
    wagerGoal: number,
    setWagerGoal: Function,
    setPositions : Function,
}   

const Settings: React.FC<SettingsProps> = ({token, setToken, wagerGoal, setWagerGoal, setPositions}) => {

    const handleChangWagerGoal = (e:any) => {
        CookiesUtils.setCookie("WAGER_GOAL", e.target.value, 365)
        setWagerGoal(e.target.value)
    }

    const handleChangeToken = (e:any) => {
        CookiesUtils.setCookie("TOKEN", e.target.value, 365)
        setToken(e.target.value)
    }

    const resetElementsPosition = () => {
        document.cookie = 'POSITIONS=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setPositions(null)
    }

    return (
        <div className='settings'>
            <button onClick={resetElementsPosition}>Reset elements position</button>
            <label>API Token:
                <input value={token} onChange={handleChangeToken} type="password"></input>
            </label>

            <label>Wager goal:
                <input type="text" value={wagerGoal} onChange={handleChangWagerGoal}></input>
            </label>
        </div>
    );
}

export default Settings;