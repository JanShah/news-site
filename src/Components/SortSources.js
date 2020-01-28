import React, {Fragment} from 'react';
export default function SortSources (props){
    const sort =(e)=>{
        props.sortSource(e.target[e.target.selectedIndex].value)
    }
    return <Fragment>
        <label htmlFor="sortSources">Sort by</label>
        <select id="sortSources" onChange={sort}>
            <option value="name">Name</option>
            <option value="language">Language</option>
            <option value="country">Country</option>
            <option value="category">Category</option>
        </select>
    </Fragment>
}
