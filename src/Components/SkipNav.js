import React from 'react';
import '../CSS/SkipNav.css';
export default (props)=>{
    return <a className="skip-navigation" id={"skip-"+props.message} href={"#"+props.link}>Skip {props.message}</a>
}