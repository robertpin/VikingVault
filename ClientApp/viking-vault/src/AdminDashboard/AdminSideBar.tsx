import  React  from 'react';
import { Link } from 'react-router-dom';
import companyIcon from '../Resources/images/addbusiness.png';

interface ISideBarProps {
    show: boolean;
}

function AdminSideBar(props: ISideBarProps) {
    const sideMenuVisibility:string = props.show ? "side-menu-hide" : "side-menu-show";
    const spanVisibility: string = props.show ? "span-hide" : "span-show";

    return <React.Fragment>
        <Link className="redirect-symbols" to="/companies"> 
            <div className={sideMenuVisibility}>
                <img className="menu-icon" src={companyIcon}/>
                <span className = {spanVisibility}> Companies </span>
            </div>
        </Link>
    </React.Fragment>
}

export {AdminSideBar};