import  React  from 'react';
import { Link } from 'react-router-dom';
import paymentMethod from './images/payment-method.png'
import block from './images/password.png'
import moneyExchange from './images/money-exchange.png'
import transfer from './images/transfer.png'

function UserSideBar(props: any) {
    const sideMenuVisibility:string = props.show ? "side-menu-hide" : "side-menu-show";
    const spanVisibility: string = props.show ? "span-hide" : "span-show";

    return <React.Fragment>
        <Link className="redirect-symbols" to="/transfer"> 
            <div className = {sideMenuVisibility}>
                <img className="menu-icon" src={transfer}></img>
                <span className = {spanVisibility}> Transfer </span>
            </div>
        </Link>
        <Link className="redirect-symbols" to="/exchange">
            <div className = {sideMenuVisibility}>
                <img className="menu-icon" src={moneyExchange}></img>
                <span className = {spanVisibility}> Exchange </span>
            </div>
        </Link>
        <Link className="redirect-symbols" to="/automatic-debit">
            <div className = {sideMenuVisibility}>
                <img className="menu-icon" src={paymentMethod}></img>
                <span className = {spanVisibility}> Automatic debit </span>
            </div>
        </Link>
        <Link className="redirect-symbols" to="/block-card">
            <div className = {sideMenuVisibility}>
                <img className="menu-icon" src={block}></img>
                <span className = {spanVisibility}> Block card </span>
            </div>
        </Link>
    </React.Fragment>
}

export {UserSideBar};
