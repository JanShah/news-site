import React, { Component, Fragment, useState } from 'react';
import '../CSS/Sources.css';
import request from '../lib/request';
import Store from '../lib/Store';
import SortSources from './SortSources';
import FilterLanguage from './FilterLanguage';
import FilterCategory from './FilterCategory';
import dataset from '../lib/dataset';
import Sources from './SourceList';
import SkipNav from './SkipNav';
import Waiting from './Waiting';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FilterFavourites(props) {
    const [active, setActive] = useState(0);
    
    const filterFavourite = () => {
        props.onClick();
        if(active===0) {
            setActive(true);
            localStorage.setItem('filterFavourites',true);
        } else {
            localStorage.setItem('filterFavourites',!active);
            setActive(!active);
        }
    }



    (()=>{
        const isActive = localStorage.getItem('filterFavourites');
        if(active===0)
        if(isActive==='false') {
            localStorage.setItem('filterFavourites',false);
        } else {
            filterFavourite();
        }

    })();


    return <button style={active?{background:'rgb(228, 174, 194)',color:'black'}:null} onClick={filterFavourite}>
        Toggle favourites <FontAwesomeIcon className={ active?"selected":'' } icon={faHeart} aria-label={"show favourites"} />
    </button>
}


export default class extends Component {
    constructor() {
        super();
        this.url = "http://localhost:3005/sources?";
        let language = "";
        const filteredLanguage = Store.getData('languageFilter');
        //bind the methods to the component.  
        //This gives the request function access to this context on button clicks (used in return method) 
        //and the ability to set state on this component. 
        //unbound components are just like normal callback functions when called but cannot use this context.
        this.filterCategory = this.filterCategory.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.filterLanguage = this.filterLanguage.bind(this);

        if(filteredLanguage) {
            language = filteredLanguage;
            console.log('language was filtered', language)
            this.filterLanguage(language);
        }
        

        this.state= {
            data:null,
            language:language
        }
    }

    async getData(url) {
        const info = await request(url, 1440);//store for one day
        this.setState({
            data: info
        });
    }


    // componentDidUpdate() {
    //     console.log('component updated',this)
    // }

    changeSort(sortBy) {
        const data = this.state.data;
        if (data) {
            const sources = data.sources.sort((a, b) => {
                return a[sortBy] < b[sortBy] ? -1 : 1;
            });
            data.sources = sources;
            this.setState({ data: data });

        }
    }
    copy(data) {
        return JSON.parse(JSON.stringify(data));
    }

    filterLanguage(language) {
        window.setTimeout(() => {
            let data = this.state.data;
            if (this.beforeSearch) {
                this.beforeSearch = null;
            }
            if (this.original) {
                data = this.copy(this.original);
            } else {
                this.original = this.copy(this.state.data);
            }
            data.category = "All";//reset the category
            if (language !== "") {
                const filtered = data ? data.sources.filter(source => { return source.language === language }) : [];
                data.sources = filtered;
                data.filtered = true;
                this.setState({ data: data, language:language });
            } else {

                data.filtered = false;
                this.setState({ data: this.copy(this.original) });
            }
        }, 200)
    }

    filterCategory(category) {

        let data = this.state.data;
        if (this.beforeSearch) {
            data = this.copy(this.beforeSearch);
        } else {
            this.beforeSearch = this.copy(this.state.data);
        }
        if (!this.original) {
            this.original = this.copy(this.state.data);
        }
        if (category !== "") {
            const filtered = data ? data.sources.filter(source =>source.category === category) : [];
            data.filtered = true;
            data.category = category
            data.sources = filtered
            this.setState({ data: data });
        } else {
            data.category = "All"
            data.filtered = false;
            this.setState({ data: this.copy(this.beforeSearch) });
            this.beforeSearch = null;
        }
    }

    filterFavourites() {
        const savedData = localStorage.getItem('favouriteSources');
        if (savedData) {
            const dataJson = JSON.parse(savedData);
            let data = this.state.data;

            const sources = data.sources.filter(source =>dataJson[source.id] === true);
            if (!this.original) {
                this.original = this.copy(this.state.data);
                data.sources = sources;
            } else {
                data = this.copy(this.original)
                this.original = null;
            }
            this.setState({ data: data });
        }
    }

    render() {
        console.log(this.state)
        if (!this.state.data) {
            this.getData(this.url);
            return <Waiting/>
        } else {

            const data = this.state.data ? this.state.data.filtered ? this.original : this.state.data : null;
    
            console.log('data in sources called', data)
            if (data) {
                const ls = dataset('language', data);
                const cats = dataset('category', data);
                console.log(cats)
                return (
                    <Fragment>
                        <nav aria-label="Sort and filter news sources">
                            <SkipNav message={'source filters'} link={'sources'} />
                            <SortSources sortSource={this.changeSort} />
                            <FilterLanguage filterBy={this.filterLanguage} list={ls} language={this.state.language} />
                            <FilterCategory filterBy={this.filterCategory} list={cats} selected={this.state.data.category} />
                            <FilterFavourites onClick={this.filterFavourites.bind(this)} />
                        </nav>
                        <Sources sources={this.state.data.sources} />
                    </Fragment>
                );
            }
            return "Waiting for data";
        }
 
    }
}
