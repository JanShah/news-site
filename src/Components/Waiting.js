import React from 'react';
// import { noAuto } from '@fortawesome/fontawesome-svg-core';

const outer = {
    position: 'absolute',
    top: '85px',
    left: '0',
    width: 'calc(100vw - 21px)',
    height: 'calc(100vh - 85px)',
    
    zIndex: '1',
    overflow: 'none',
   
}
const inner = {
    margin: '30vh auto',
    fontSize: '128px',
    textAlign:'center',
    color:'#F44336',
    animation: 'fade-in-out 1.6s infinite',
}

export default () => {
    return <div style={outer}>
        <div style={inner}>
            Loading
        </div>
    </div>
}