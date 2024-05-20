/* eslint-disable no-unused-vars */
import { createPortal } from "react-dom";
import { BalanceContext } from "../../../contexts/BalanceContext";
import { useContext } from "react";
import './EnergyModal.css'

export default function EnergyModal({ setShowAlert, setCurrEgy }) {
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const hotelCost = 150000;
    return createPortal(
        <>
            <div className="no-egy-modal-overlay">
                <div className="no-egy-modal-container">
                    <div className="no-egy-modal-header text-white">
                        <h4>Energi Habis! Kamu Telah Pingsan</h4>
                        <p>Kamu beruntung ada orang baik yang menolong kamu<br />dan membawa kamu ke hotel untuk beristirahat.</p>
                    </div>
                    <div className="no-egy-modal-content">
                        <div className="no-egy-reset-modal-btn-container">
                            {/* <button className='no-egy-reset-modal-btn btn btn-warning' */}
                            <button className='no-egy-reset-modal-btn border-0 rounded-2'
                                onClick={() => {
                                    setShowAlert(false);
                                    setCurrEgy(100);
                                    setCurrMoney(prevMoney => prevMoney - hotelCost)
                                }}>Check Out 🪙250k</button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}