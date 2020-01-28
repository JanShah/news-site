import React, { Component, Fragment } from 'react';
import '../CSS/Article.css';
import logo from '../logo.svg';
import Modal from './Modal';
export default class extends Component {
    /**
     * Each article is processed here
     * 
     * 
     */
    constructor() {
        super();
        this.state = {
            active: null
        }
    }
    /**
     * Test the articles for completeness
     * some articles are not fully populated. cull them here.
     * @param {Object} article 
     */
    testTitle(article) {
        return !!article.title;
    }

    /**
     * 
     * @param {Object} props the article to activate a modal for
     */
    loadArticle(props) {
        this.setState(
            {
                active: props
            }
        )
    }
    /**
     * unload the active modal window
     */

    unloadArticle() {
        this.setState({
            active: null
        })
    }

    render() {
        const props = this.props
        if (this.testTitle(this.props)) {
            const img = new Image();

            img.src = props.urlToImage;
            img.onload = () => {
                console.log('image loaded');
            }
            const image = !img.src.endsWith('null') ? img.src : logo;
            return <Fragment>

                <article className="article">
                    <img src={image} alt={props.title} style={{cursor:'pointer'}} onClick={() => this.loadArticle(props)}/>
                    <h3>{props.title}</h3>
                    <div className="article-menu">
                        <a href={props.url}>
                            Source: {props.source.name}
                        </a>
                        <button className="more-info" aria-label="see more information (loads in a modal window)" onClick={() => this.loadArticle(props)}>More</button>
                    </div>
                </article>
                {this.state.active 
                ?<Modal unload={this.unloadArticle.bind(this)} image={image} article={this.state.active} />               
                : ""}

            </Fragment>
        } else {

            return "";
        }
    }

}