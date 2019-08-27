import  React  from 'react';
import { Link } from 'react-router-dom';
import transferIcon from '../Resources/images/transfer.png'
import moneyExchangeIcon from '../Resources/images/money-exchange.png'
import paymentIcon from '../Resources/images/payment-method.png'
import notification from '../Resources/images/notification.png'
import unreadNotifications from "../Resources/images/unreadNotifiactions.png";

interface IUserSideBarProps {
    show: boolean;
    unreadNotification: boolean;
}

function UserSideBar(props: IUserSideBarProps) {
    const sideMenuVisibility: string = props.show ? "side-menu-hide" : "side-menu-show";
    const spanVisibility: string = props.show ? "span-hide" : "span-show";

    return <React.Fragment>
        <Link className="redirect-symbols" to="/transfer"> 
            <div className={sideMenuVisibility}>
                <img className="menu-icon" src={transferIcon} alt="Transfer" title="Transfer"/>
                <span className={spanVisibility}> Transfer </span>
            </div>
        </Link>
        <Link className="redirect-symbols" to="/exchange">
            <div className={sideMenuVisibility}>
                <img className="menu-icon" src={moneyExchangeIcon} alt="Exchange" title="Exchange"/>
                <span className={spanVisibility}> Exchange </span>
            </div>
        </Link>
        <Link className="redirect-symbols" to="/automatic-debit">
            <div className={sideMenuVisibility}>
                <img className="menu-icon" src={paymentIcon} alt="Automatic debit" title="Automatic debit"/>
                <span className = {spanVisibility}> Automatic debit </span>
            </div>
        </Link>
        <Link className="redirect-symbols" to="/notifications">
            <div className={sideMenuVisibility}>
                <img className="menu-icon" src={props.unreadNotification? unreadNotifications : notification}/>
                <span className = {spanVisibility}> Notifications </span>
            </div>
        </Link>
    </React.Fragment>
}

export {UserSideBar};