import { createPortal } from "react-dom";
import Loading from "./Loading";
import './LoadingModal.css'

export default function LoadingModal() {
    return createPortal(
        <>
            <div className="loading-modal-overlay">
                <div className="loading-modal-container">
                    <div className="loading-content">
                        <Loading size="large" colors={["rgba(0,90,154,1)", "rgba(50,155,230,1)", "rgba(255,255,255,1)"]} />
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}
