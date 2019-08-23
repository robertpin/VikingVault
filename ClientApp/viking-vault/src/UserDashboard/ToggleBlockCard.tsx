import * as React from "react";
import './ToggleBlockCard.css';

interface IToggleBlockCardState{
    toggleSwitch: any
    isCardBlocked: boolean
}

function ToggleBlockCard (props: IToggleBlockCardState) 
{
    return (
        <label className="switch-block-card">
            <input type="checkbox" onClick = {props.toggleSwitch} checked = {!props.isCardBlocked}/>
            <span className="slider round"> </span>
        </label>
    );
}
export default ToggleBlockCard;