import React, {useEffect, useState} from 'react';
import './Settings.scss'

type SettingsProps = {
    token: string,
    setToken: Function
}

const Settings: React.FC<SettingsProps> = ({token, setToken}) => {

    return (
        <div className='settings'> 

        <label>API Token:
            <input value={token} onChange={e => {document.cookie = `TOKEN=${(e.target.value)}`; setToken(e.target.value)}} type="password"></input>
        </label>

        {/* <label>Wager goal:
            <input type="text" value={0}></input>
        </label> */}
        </div>
    );
}

export default Settings;