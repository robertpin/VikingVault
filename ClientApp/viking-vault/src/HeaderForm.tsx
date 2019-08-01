import React from 'react';
import logo from './login_resources/logo_wirtek.png'

function HeaderForm(){
    return <header className="header">
    <img src={logo} className="vikingImage" alt="Logo Wirtek" />
    </header>
}



export {HeaderForm}