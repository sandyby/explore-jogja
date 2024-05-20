import { createPortal } from "react-dom"
import { useContext } from "react";
import { RainyContext } from "../../../contexts/RainyContext";
import './RainyModal.css'

export default function RainyModal() {
    const { isRainy, setIsRainy, showRainyModal, setShowRainyModal } = useContext(RainyContext);

    return createPortal(
        <div className="rainy-modal-overlay">
            <div className="rainy-modal-container">
                <div className="rainy-modal-header">
                    <h1>Cuaca Sedang Hujan!</h1>
                </div>
                <div className="rainy-modal-content">
                    <h3>Energi dan Happiness Berkurang 2x Lebih Cepat!</h3>
                    <div className="rainy-modal-btn-container">
                        {/* kalo hujan: */}
                        <button className='rainy-modal-btn border-0 rounded-2'
                            onClick={() => {
                                setShowRainyModal(false);
                            }}
                        >
                            Mengerti
                        </button>
                        {/* kalo ga hujan: */}
                        {/* <button className='rainy-modal-btn border-0 rounded-2'
                            onClick={() => {
                                setShowRainyModal(true);
                            }}
                        >
                            Mengerti
                        </button> */}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}
