import React, {useEffect, useState} from 'react';
import './Settings.scss'

type SettingsProps = {
    token: string,
    setToken: Function,
    wagerGoal: number,
    setWagerGoal: Function,
}   

const Settings: React.FC<SettingsProps> = ({token, setToken, wagerGoal, setWagerGoal}) => {

    return (
        <div className='settings'> 
            <label>API Token:
                <input value={token} onChange={e => {document.cookie = `TOKEN=${(e.target.value)}`; setToken(e.target.value)}} type="password"></input>
            </label>

            <label>Wager goal:
                <input type="text" value={wagerGoal} onChange={e => {document.cookie = `WAGER_GOAL=${(e.target.value)}`; setWagerGoal(e.target.value)}}></input>
            </label>
        </div>
    );
}

export default Settings;