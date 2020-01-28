import React, {Fragment} from 'react';
import {languageList} from '../data/languageList';
import Store from '../lib/Store';
/**
 * Create a dropdown list to filter the language
 * @param {Object} props The languages array and a callback method
 */
export default function FilterLanguage(props) {

    const filtered=(e)=>{    
        const language = e.target[e.target.selectedIndex].value;
        Store.setData('languageFilter',language,120)
        props.filterBy(e.target[e.target.selectedIndex].value)
    }

    return props.list.length?<Fragment>
    <label htmlFor="filterLanguage">Filter language</label>
    <select onChange={filtered} id="filterLanguage" value={props.language}>
        <option value="">All</option>
        {props.list.map((language,index)=>{
            return  <option key={index} value={language}>{languageList[language]}</option>
        })}
       
    </select>
</Fragment>:""
}