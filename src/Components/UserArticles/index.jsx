

import React from "react";
import PropTypes from 'prop-types'
import Articles from "./Articles";

class UserArticles extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       articles:[],
    }
  }

  async UNSAFE_componentWillMount(){
    const articles = await this.props.getUserArticles(this.props.token)
    
    this.setState({articles})
    this.props.setArticles(articles)
  }

  editArticle = (article) => {
    this.props.history.push(`/article/edit/${article.id}`)
    this.props.setArticles(article)
  }

  handlePagination=async(url)=>{
    const articles = await this.props.getArticles(url)
    this.setState({articles})
    this.props.setArticles(articles.data)
  }

  deleteArticle = async (id) => {
    await this.props.deleteArticle(id);

    // remove article from list.
    const articles = this.state.articles.filter(article => article.id !== id);
    this.setState({
      articles,
    });
  }

  render(){
    return(
      <Articles 
      articles={this.state.articles}
      nextUrl={this.state.articles.next_page_url}
      prevUrl={this.state.articles.prev_page_url}
      handlePagination={this.handlePagination}
      deleteArticle={this.deleteArticle}
      editArticle={this.editArticle}
      />
    )
  }


}
UserArticles.propTypes={
  getArticles:PropTypes.func.isRequired,
  token:PropTypes.string,
  setArticles:PropTypes.func.isRequired,
  getUserArticles:PropTypes.func.isRequired,
  deleteArticle:PropTypes.func.isRequired,
  editArticle:PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default UserArticles;