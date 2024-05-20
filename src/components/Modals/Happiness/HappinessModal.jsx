/* eslint-disable no-unused-vars */
import { createPortal } from "react-dom";
import { BalanceContext } from "../../../contexts/BalanceContext";
import { useContext, useEffect, useState } from "react";
import './HappinessModal.css'

export default function HappinessModal({ setShowAlert, setCurrHap }) {
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const [randomCost, setRandomCost] = useState(0);
    const minCost = 200000;

    useEffect(() => {
        setRandomCost(minCost + Math.floor(Math.random() * 300000));
    }, [])

    return createPortal(
        <>
            <div className="no-hap-modal-overlay">
                <div className="no-hap-modal-container">
                    <div className="no-hap-modal-header text-white">
                        <h4>Happiness Habis! Kamu Menjadi Bosan</h4>
                        <p style={{ margin: 0 }}>Saking bosannya, kamu pergi keluar dan memutuskan untuk<br />mencari hiburan, serta berfoya-foya. Alhasil, setelah beberapa<br />jam, kamu tak sadar telah menghabiskan uang sebanyak</p>
                        <h4 style={{ margin: "10px" }}>🪙{randomCost}</h4>
                    </div>
                    <div className="no-hap-modal-content">
                        <div className="no-hap-reset-modal-btn-container">
                            {/* <button className='no-hap-reset-modal-btn btn btn-warning' */}
                            <button className='no-hap-reset-modal-btn border-0 rounded-2'
                                onClick={() => {
                                    setShowAlert(false);
                                    setCurrHap(100);
                                    setCurrMoney(prevMoney => prevMoney - randomCost)
                                }}>Bayar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}