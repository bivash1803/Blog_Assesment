import React from 'react';
import PropTypes from 'prop-types';

import Article from './Article';

class SingleArticleContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      article: null,
      loading: true,
    };
  }
  async UNSAFE_componentWillMount(){
    //console.log(this.props)
    let article = this.props.articles && this.props.articles.find(articleInArray=>articleInArray.slugs == this.props.match.params.slugs)
    if(article){
      this.setState({article,loading:false})
    }else{
      article = await this.props.getArticle(this.props.match.params.slugs)
      this.setState({article,loading:false})

    }
  }

  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <Article
            article={this.state.article}
          />
        }
        {
          this.state.loading &&
          <p className="text-center">LOADING ...</p>
        }
        
      </div>
    );
  }
}

SingleArticleContainer.propTypes = {
  getArticle: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slugs: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  })).isRequired,
};

export default SingleArticleContainer;