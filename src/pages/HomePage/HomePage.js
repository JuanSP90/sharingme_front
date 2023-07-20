import React from 'react'
import './HomePage.css'
import map from '../../images/map.png'


const HomePage = () => {
    //AQUI QUIERO TRES DIV EN HORIZONTAL CON 10% 80% 10% VH para que todo se vea centradito, a parte tengo que dejar un hueco para una foto grande que sera una foto del ejemplo de la web y mas abajo la importacion de la API que nos diga cuantos usuarios tenemos y donde se han registrado

    return (
        <div className="body">
            <div className="divLateral"></div>
            <div className="divPrincipal">
                holita

                <img alt="ejemplo perfiles" />
                <button>Login</button>
                <button>Register</button>
                <img src={map} alt="ejemplo api google maps" />
            </div>
            <div className="divLateral"></div>
        </div>
    )
}

export default HomePage