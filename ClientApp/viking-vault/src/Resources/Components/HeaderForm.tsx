import React from 'react';
import logo from '../images/logo_wirtek.png'
import { Link } from 'react-router-dom';

function HeaderForm(){
    return <header className="header">
        <Link to="/"><img src={logo} className="viking-image" alt="Logo Wirtek" /></Link>
    </header>
}
export {HeaderForm}