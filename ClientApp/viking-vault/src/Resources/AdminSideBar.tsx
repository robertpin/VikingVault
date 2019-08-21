import  React  from 'react';
import { Link } from 'react-router-dom';
import card from './images/business-card-of-a-man-with-contact-info.png'

function AdminSideBar(props: any) {
    const sideMenuVisibility:string = props.show ? "side-menu-hide" : "side-menu-show";
    const spanVisibility: string = props.show ? "span-hide" : "span-show";

    return <React.Fragment>
        <Link className="redirect-symbols" to="/companies"> 
            <div className = {sideMenuVisibility}>
                <img className="menu-icon" src={card}></img>
                <span className = {spanVisibility}> Companies </span>
            </div>
        </Link>
    </React.Fragment>
}

export {AdminSideBar};
