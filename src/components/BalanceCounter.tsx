import React from 'react';
import {useBalance} from "../App";
import { Icon24Coins } from '@vkontakte/icons';
import "./BalanceCounter.css";

export default function BalanceCounter() {
    const [balance] = useBalance()

    return <div className="BalanceCounter">
        <Icon24Coins className="BalanceCounter-Icon"/>
        <div className="BalanceCounter-Text">{balance}</div>
    </div>
}