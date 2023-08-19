import React, { useContext, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import './Share.css';
import QRCode from "react-qr-code";
import shareIcon from '../../images/share3.png'
import qrIcon from '../../images/qr-code-share.png'

const Share = () => {
    const { profile } = useContext(AuthContext);
    const [showQRPopup, setShowQRPopup] = useState(false);

    const ShareButton = async () => {
        const shareURL = `http://localhost:3000/user/${profile.userName}`;
        try {
            await navigator.share({ url: shareURL });
        } catch (error) {
            console.error('Error al compartir:', error);
        }
    };

    const handleOpenQRPopup = () => {
        setShowQRPopup(true);
    };

    const handleCloseQRPopup = () => {
        setShowQRPopup(false);
    };

    return (
        <div className="SharePageContainer">
            <Menu />
            <div className="botonazos">
                <img src={shareIcon} alt="share" className="imgShare" onClick={ShareButton}></img>
                <img src={qrIcon} alt="share" className="imgShare" onClick={handleOpenQRPopup}></img>
            </div>
            {showQRPopup && (
                <div className="qr-popup">
                    <button className="btn" onClick={handleCloseQRPopup} style={{ backgroundColor: 'red', margin: '5px' }}>X</button>
                    <div>
                        <QRCode
                            value={`http://localhost:3000/user/${profile.userName}`}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}

export default Share;
