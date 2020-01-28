import React from 'react';
import SkipNav from './SkipNav';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';

/**
 * The header and main navigation bar
 */
export default function () {
    return <header>
        <SkipNav message={'navigation'} link={'main'}/>
        <Link style={{flexBasis: '210px'}} to="/"><h1>World News</h1></Link>
        <Navigation />
    </header>;
}

