import React, { useEffect, useState, useContext, createContext } from "react";
import coin from '../../assets/game-coin.png'
import { BalanceContext } from "../../contexts/BalanceContext";
import "./Bars.css";

export default function Balance() {
    const { currMoney, setCurrMoney } = useContext(BalanceContext)

    // useEffect(() => {
    //     const currBalance = JSON.parse(localStorage.getItem('userBalance'));
    //     if (currBalance) {
    //         setCurrMoney(currBalance);
    //     }
    // }, []);

    // const add200k = () => {
    //     setCurrMoney(prevMoney => prevMoney + 200000);
    // };

    // const remove200k = () => {
    //     setCurrMoney(prevMoney => prevMoney - 200000);
    // };

    // useEffect(() => {
    //     localStorage.setItem("userBalance", JSON.stringify(currMoney));
    // }, [currMoney]);

    const handleColorChange = () => {
        return currMoney >= 0 ? "rgb(0, 0, 0)" : "rgb(255, 0, 0)";
    };

    return (
        <div className="balance-container position-absolute">
            <span><img className="coin" src={coin} alt="coin" /></span>
            <div className="balance-num" style={{ color: handleColorChange() }}>
                {currMoney}
            </div>
            {/* <button onClick={add200k}>Add 200k</button>
            <button onClick={remove200k}>Remove 200k</button> */}
        </div>
    );
}
