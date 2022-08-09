import React, {useEffect, useState} from 'react';
import './Settings.scss'

type SettingsProps = {
    token: string,
    setToken: Function,
    wagerGoal: number,
    setWagerGoal: Function,
    setPositions : Function,
}   

const Settings: React.FC<SettingsProps> = ({token, setToken, wagerGoal, setWagerGoal, setPositions}) => {

    function setCookie(cName:string, cValue:string, expDays:number) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }

    const handleChangWagerGoal = (e:any) => {
        setCookie("WAGER_GOAL", e.target.value, 365)
        setWagerGoal(e.target.value)
    }

    const handleChangeToken = (e:any) => {
        setCookie("TOKEN", e.target.value, 365)
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