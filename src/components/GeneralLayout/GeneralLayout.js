import React from 'react'
import Menu from '../Menu/Menu'

const GeneralLayout = ({ children }) => {

    return (
        <div>
            <Menu />
            {children}

        </div>
    )
}

export default GeneralLayout