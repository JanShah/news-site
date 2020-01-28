import React, {Fragment} from 'react';
/**
 * Create a dropdown select box for the categories filter
 * @param {Object} props The list of categories and a callback method
 * 
 * 
 */
export default function FilterCategory(props) {

    const filtered=(e)=>{    
        props.filterBy(e.target[e.target.selectedIndex].value)
    }
    return props.list.length?<Fragment>
    <label htmlFor="filterCategory">Filter category</label>
    <select  value={props.selected} defaultValue={props.selected} onChange={filtered} id="filterCategory">
        <option value="">All</option>
        {props.list.map((category,index)=>{
            return  <option key={index} value={category}>{category.replace(category[0],category[0].toUpperCase())}</option>
        })}
       
    </select>
</Fragment>:""
}