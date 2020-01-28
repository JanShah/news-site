import React, { Component, Fragment } from 'react';
import request from '../lib/request';
import Article from './Article';
import Waiting from './Waiting';
import '../CSS/Headlines.css';
import { NavLink } from 'react-router-dom';
import Store from '../lib/Store';

export default class Headlines extends Component {
    /**
     * Process the news headlines
     * @param {Object} props received from router
     */
    constructor(props) {
        super();
        this.state = {
            loading: true,
            page: null,
            articles: null,
            key: props.key,
            search: null
        };

    }
    /**
     * Clear the existing articles
     * 
     * 
     */
    clearArticles() {
        this.setState({
            loading: true,
            page: null,
            articles: null,
            key: this.props.key,
            search: null
        });
    }
    /**
     * Get the articles chosen by the path request
     * 
     * 
     */
    async getArticles() {
        let pathName = this.props.location.pathname + this.props.location.search;
        const currentLanguage = Store.getData('languageFilter')
        if (pathName.indexOf('&language') < 0) {
            if (currentLanguage) {
                pathName += "/" + currentLanguage
            } else {
                pathName += "/en";
            }
        }

        const articles = await request("http://localhost:3005" + pathName, 5);

        this.setState({
            articles: articles,
            page: this.props.location.pathname,
            key: this.props.key,
            search: this.props.location.search,
            loading: false
        });
    }

    componentDidUpdate() {
        if (!this.state.page) {
            this.getArticles();
        } else if ((this.state.page !== this.props.location.pathname)) {
            this.clearArticles();
        }
    }

    /**
     * Pagination
     * 
     */
    pages() {
        const results = this.state.articles.totalResults;
        const noOfArticles = this.state.articles.articles.length;
        const thisURL = this.props.location.pathname.slice(0, -2)
        const max = Math.min(9, Math.floor(results / noOfArticles));
        const pages = [];
        for (let i = 1; i <= max; i++) {
            pages.push(thisURL + '/' + i);
        }
        const activePage = (page) => this.state.page === page ? "active" : null;
        let headline = "";
        if (this.props.location && this.props.location.state && this.props.location.state.headline)
            headline = this.props.location.state.headline;
        return <ul className="pages">

            {pages.map((page, index) => {
                return <li key={index} className={activePage(page)}>
                    <NavLink
                        aria-label={"navigate to page " + page.charAt(page.length - 1)}
                        activeClassName="active"
                        to={{
                            pathname: page,
                            state: {
                                headline: headline,
                                page: " page " + page.charAt(page.length - 1)
                            }
                        }}>{page.charAt(page.length - 1)}</NavLink>
                </li>
            })}
        </ul>
    }
    /**
     * Render the output
     * 
     * 
     */
    render() {
        let headline = "";
        let page = "";
        let color = "";

        if (this.props.location.state && this.props.location.state.page) {
            page = this.props.location.state.page
        }

        if (this.props.location.state && this.props.location.state.color) {
            color = this.props.location.state.color;
            if (color !== "") {
                document.body.style.background = color
            }
        }

        if (this.props.location.state && this.props.location.state.headline) {
            headline = <h2>{this.props.location.state.headline + page}</h2>
        }
        if (!this.state.page) {
            this.getArticles();
            return <Waiting />;
        }
        if (this.state && this.state.articles)
            return <Fragment>
                <div className="page-nav">
                    {this.state.loading ? <Waiting /> : headline}
                    {this.pages()}
                </div>
                <section id="headlines">{
                    this.state.articles.articles.map((article, index) => {
                        return <Article key={index} {...article} />
                    })}
                </section>
                {this.pages()}
            </Fragment>
    }
}
