import React, { useEffect, useState, useContext, createContext } from "react";
import coin from '../../assets/game-coin.png'
import { BalanceContext } from "../../contexts/BalanceContext";
import "./Bars.css";

export default function Balance() {
    const { currMoney, setCurrMoney } = useContext(BalanceContext)

    const handleColorChange = () => {
        return currMoney >= 0 ? "rgb(0, 0, 0)" : "rgb(255, 0, 0)";
    };

    return (
        <div className="balance-container position-absolute">
            <span><img className="coin" src={coin} alt="coin" /></span>
            <div className="balance-num" style={{ color: handleColorChange() }}>
                {currMoney}
            </div>
        </div>
    );
}
