import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Article=({article})=>{
    return (
      <article className="mt-90">
        
        <header className="text-center mb-40">
          <h3>
            <Link to={`/article/${article.id}`}>
              {article.title}
            </Link>
          </h3>
          <div className="link-color-default fs-12">
            
            <a href="$">{article.category}</a>, <time>{article.created_at}</time>
          </div>
        </header>
        <a href="blog-single.html">
          <img className="rounded" src={article.imageUrl} alt="..." />
        </a>
        <div className="card-block">
          <p className="text-justify">
            <b>{article.content}</b>
          </p>
          <p className="text-center mt-40">
            <Link className="btn btn-primary btn-round" to={`/article/${article.id}`}>
              Read more
            </Link>
          </p>
        </div>
      </article>
    );
}
Article.propTypes = {
  article: PropTypes.shape({
    id:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug:PropTypes.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    category_id:PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
 
};


export default Article