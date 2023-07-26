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
            console.log('URL compartida con éxito.');
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
                {/* <button className="botonCompartirPerfil" onClick={ShareButton}> */}
                <img src={shareIcon} alt="share" className="imgShare" onClick={ShareButton}></img>
                {/* Compartir mi perfil */}
                {/* </button> */}
                {/* <button className="botonAbrirPop" onClick={handleOpenQRPopup}> */}
                <img src={qrIcon} alt="share" className="imgShare" onClick={handleOpenQRPopup}></img>

                {/* Abrir QR</button> */}
            </div>
            {showQRPopup && (
                <div className="qr-popup">
                    <button className="close-btn" onClick={handleCloseQRPopup}>X</button>
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
