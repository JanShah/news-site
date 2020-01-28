import React, { Component } from 'react';
import '../CSS/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'


/**
 * The modal window
 * 
 */
export default class extends Component {
    constructor() {
        super();
        this.handleUnload = this.handleUnload.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * Unload the modal window on escape key press
     * @param {Event} e the event trigger 
     */
    handleUnload(e) {
        console.log("handling")
        if(e.key==="Escape")
        this.props.unload();
    }
    /**
     * Close the modal on click
     * @param {Event} e the event trigger
     */
    handleClick(e) {
        if(e.target.className==='modal') {
            this.props.unload();
        }
    }
    componentDidMount() {
        window.addEventListener('keyup',this.handleUnload); 
        window.addEventListener('click',this.handleClick);
        // https://codepulse.blog/how-to-focus-element-in-react/
        this.box.focus();
    }

    componentWillUnmount() {
        window.removeEventListener('keyup',this.handleUnload);    
        window.removeEventListener('click',this.handleClick)        
    }
    /**
     * Return a link to more news from this source or the article source name if there is no link
     * @param {Object} article the article to get a link from
     */
    sourcesLink(article) {
        if(article.source.id) {
            const source = "/headlines?sources=" + article.source.id + "&language=en"
            return <a href={source}>See more from headlines from <em>{article.source.name}</em></a>
        } else if (article.source.name){ 
            return <em>{article.source.name}</em>
        }
    }
    /**
     * Return a link to more news from this source or the article source name if there is no link
     * @param {Object} article the article to get a link from
     */
    articleLink(article) {
        if(article.url) { 
            return <a className="articleLink" target="_new" href={article.url}>Original article on <em>{article.source.name}</em></a>
        } else {
            return "";
        }
    }
    render() {
        const article = this.props.article;
        const source = "/headlines?sources=" + article.source.id + "&language=en"

        console.log(this.props,article)

        return <div className="modal">
            <div className="modal-window">
                <div className="modal-title" ref={elem => (this.box = elem)}>
                    <h3>{article.title}</h3>
                    <button onClick={this.props.unload}><FontAwesomeIcon className="newsIcon" icon={faTimes} aria-label={"Close this modal"} /></button>
                </div>
                <div className="modal-subtitle">
                    <h4 tabIndex="0">{article.description}</h4>
                </div>
                <div className="modal-body" tabIndex="0">
                <img src={this.props.image} alt={this.props.article.title} />
                <p style={{maxWidth:'100%',overflow:'auto'}}>
                    {article.content}
                </p>
                </div>
                <div className="modal-footer">
                    {article.author?<em>Author: {article.author}</em>:<div>No author listed</div>}
                    {this.sourcesLink(article)}
                    <button onClick={this.props.unload}><FontAwesomeIcon className="newsIcon" icon={faTimes} aria-label={"Close this modal"} /></button>
                    {this.articleLink(article)}
                </div>
            </div>
        </div>
    }
}