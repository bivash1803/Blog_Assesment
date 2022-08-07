import React from 'react';
import PropTypes from 'prop-types';

import Banner from '../../Banner';
import Article from '../../Article';

const Articles = ({
  articles,handlePagination,nextUrl,prevUrl,deleteArticle,editArticle
}) => ((
  <div>

    <Banner
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="My Articles"
      subTitle="Read and get updated on how we progress."
    />
    <main className="main-content bg-gray">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
         {articles&&articles.map(article => (
            <div key={article.id}>
              <Article  article={article} />
              <div className="text-center">
              <button className='btn btn-info' onClick={()=>editArticle(article)} >Edit Article</button>
              <button className='btn btn-danger' onClick={()=>deleteArticle(article.id)}>Delete Article</button>
              </div>
              <hr />
            </div>))}
            { articles.length == 0 &&
             <div className="text-center mt-3 alert-info">
              <b>You Did not Post Anything till now....</b>
              </div>
            }
          <nav className="flexbox mt-50 mb-50">
            <a className={`btn btn-white ${prevUrl?'':'disabled'}`} href="#" onClick={()=>handlePagination(prevUrl)}>
              <i className="ti-arrow-left fs-9 ml-4" /> Previous Page
            </a>
            <a className={`btn btn-white ${nextUrl?'':'disabled'}`} href="#" onClick={()=>handlePagination(nextUrl)} >
              Next Page <i className="ti-arrow-right fs-9 mr-4" />
            </a>
          </nav>
        </div>
      </div>
    </main>
  </div>
));

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  handlePagination: PropTypes.func.isRequired,
  nextUrl: PropTypes.string,
  prevUrl: PropTypes.string,
  deleteArticle: PropTypes.func,
  editArticle:PropTypes.func
};

Articles.defaultProps = {
  articles: [],
  nextUrl: null,
  prevUrl: null,
};

export default Articles;