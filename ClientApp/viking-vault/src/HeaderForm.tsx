import React from 'react';
import logo from './login_resources/logo_wirtek.png'

function HeaderForm(){
    return <header className="header">
    <img src={logo} className="viking-image" alt="Logo Wirtek" />
    </header>
}
export {HeaderForm}