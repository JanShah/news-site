import React, { useState } from 'react';
import '../CSS/Navigation.css';
import { NavLink } from 'react-router-dom';
import request from '../lib/request';
import dataset from '../lib/dataset';


/**
 * The main navigation bar
 */
export default () => {
    const [sources, setSources] = useState(); //react hooks

    /**
     * Asynchronously fetch the content and retrieve the category information from it
     */
    async function load() {
        const url = "http://localhost:3005/sources?";
        const data = await request(url, 1440);
        setSources(dataset('category', data));
    }


    const navColours = ['rgb(26, 37, 127)', 'rgb(31, 42, 152)', 'rgb(34, 46, 165)', 'rgb(37, 49, 178)', 'rgb(39, 53, 191)', 'rgb(42, 57, 203)', 'rgb(49, 63, 212)', 'rgb(74, 87, 218)']
    if (sources) {
        return <div className="nav-container">
            <nav className="navigation" aria-label="Main Navigation">
                <ul>
                    <li style={{ background: navColours[0] }}>
                        <NavLink exact
                            activeClassName="active"
                            to={
                                {
                                    pathname: "/headlines/1",
                                    state: {
                                        headline: "Headlines",
                                        color: navColours[0]
                                    }
                                }
                            }>The front page</NavLink>
                    </li>
                    {sources.map((source, index) => {
                        return <li style={{ background: navColours[(index + 1) % 8] }} key={index}>
                            <NavLink exact
                                activeClassName="active"
                                to={
                                    {
                                        pathname: "/headlines/" + source + "/1",
                                        state: {
                                            headline: source + " Headlines",
                                            color: navColours[(index + 1) % 8]
                                        }
                                    }
                                }>{source}</NavLink>
                        </li>
                    })}
                </ul>
            </nav>
        </div>


    } else {
        load();
        return <div>Loading</div>
    }
}