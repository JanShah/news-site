import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Source.css';
import '../../node_modules/flag-icon-css/css/flag-icon.css';
import { faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import checkFlag from '../lib/checkFlag';
export default function (props) {
    const saved = (id) => {
        const savedData = localStorage.getItem('favouriteSources');
        if (savedData) {
            // console.log('there is savedData')
            const jsonData = JSON.parse(savedData);
            // console.log(jsonData[id])
            // const item = JSON.parse(savedData)[id];
            return jsonData[id] === true;
        }
    }
    const [selected, setSelected] = useState(saved(props.id));

    const toggleSelection = () => {
        save(props.id, !selected)
        setSelected(!selected);
    }
    const save = (id, isSelected) => {
        const savedData = localStorage.getItem('favouriteSources');
        const values = savedData ? JSON.parse(savedData) : {};
        values[id] = isSelected;
        localStorage.setItem('favouriteSources', JSON.stringify(values))
    }

    let country = checkFlag(props.country);

    return <div className="news-source" style={{ animationDuration: `${500 + props.index * 50}ms` }}>
        <h2><a aria-describedby={"desc_" + props.id} href={props.url}>{props.name}</a></h2><span className={"flag-icon flag-icon-" + country}></span>
        <summary id={"desc_" + props.id}>{props.description}</summary>
        <div className="iconButtons">
            <button
                aria-pressed={selected}
                aria-label={"add " + props.name + " to favourites"}
                className="favourite"
                onKeyUp={(e)=>e.key!=="Tab"?toggleSelection(e):null}
                onKeyPressCapture={toggleSelection}
                onClick={toggleSelection}
                tabIndex="0">
                <FontAwesomeIcon className={saved(props.id) ? "selected" : ""} icon={faHeart} aria-label={"add " + props.name + " to favourites"} />
            </button>
            <NavLink exact
                activeClassName="active"
                className="articles"
                aria-label={"view the latest headlines from " + props.name}
                to={
                    {
                        pathname: "/headlines?sources=" + props.id + "&language=" + props.language,
                        state: {
                            headline: "Headlines from "+props.name
                        }
                    }
                }>
                    <FontAwesomeIcon className="newsIcon" icon={faNewspaper} aria-label={"view latest articles from " + props.name} />
                </NavLink>

        </div>
        <em>{props.category}</em>
    </div>
}