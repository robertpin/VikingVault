import * as React from "react";
import './Toggle.css';
import { constants } from "../Resources/Constants";

interface IToggleState{
    requestTransfer: boolean;
    toggleSwitch: any;
}

function Toggle (props: IToggleState){
    return (
        <label className="common-toggle">
            <input type="checkbox" checked = {props.requestTransfer} onClick = {props.toggleSwitch}/>
            <span className="slider round"> </span>
        </label>
    );
}

export default Toggle;