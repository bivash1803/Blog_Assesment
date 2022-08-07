
import * as React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import CreateArticle from "./Components/CreateArticle";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import SingleArticle from "./Components/SingleArticle";
import Welcome from "./Components/Welcome";
import authService from "./services/auth";
import PropTypes from 'prop-types';
import Auth from "./Components/Auth";
import RedirectIfAuth from "./Components/RedirectIfAuth";
import UserArticles from "./Components/UserArticles";



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser:null,
      articles: []
    }
  }

  componentDidMount() {
    const user = localStorage.getItem('user')
    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      })
    }
    console.log(this.state.authUser)
    console.log(typeof(this.state.authUser))
  }
  setArticles = (articles) => {
    this.setState({ articles })
  }
  setAuthUser = (authUser) => {
    console.log('set auth called')
    console.log(authUser)
    console.log(this.state.authUser)
    this.setState({
      authUser, 
    }, () => {
      localStorage.setItem('user', JSON.stringify(authUser));
      this.props.notyService.success("Success Fully Logged In");
      this.props.history.push('/');
    })
    console.log(this.state.authUser)
    console.log('end')
  }

  removeAuthUser=()=>{
    localStorage.removeItem('user');
    this.props.notyService.success("Succesfully Logged Out")
    this.setState({ authUser:null});
  }


  render() {
    const { location } = this.props
    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/register' &&
          <Navbar authUser={this.state.authUser} removeAuthUser={this.removeAuthUser} />
        }
        <Route exact path="/" render={(props) => (
          <Welcome
            {...props}
            getArticles={this.props.articleService.getArticles}
            setArticles={this.setArticles}
          />
        )} />
        <Auth
          path="/articles/create"
          component={CreateArticle}
          props={{
            getArticleCategories: this.props.articleService.getArticleCategories,
            createArticle: this.props.articleService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
            notyService:this.props.notyService,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        
       <Auth
          path="/user/articles"
          component={UserArticles}
          props={{
            getUserArticles: this.props.articleService.getUserArticles,
            setArticles: this.setArticles,
            deleteArticle: this.props.articleService.deleteArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Auth
          path="/article/edit/:slug"
          component={CreateArticle}
          props={{
            getArticleCategories: this.props.articleService.getArticleCategories,
            createArticle: this.props.articleService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
            articles:this.state.articles,
            updateArticle: this.props.articleService.updateArticle,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        {/* <Route path="/articles/create" render={(props) => (
          <CreateArticle
            {...props}
            getArticleCategories={this.props.articleService.getArticleCategories}
            createArticle={this.props.articleService.createArticle}
            token={this.state.authUser ? this.state.authUser.token : null}
          />
        )} /> */}
        <Route path="/article/:slugs" exact render={(props) => (
          <SingleArticle
            {...props}
            getArticle={this.props.articleService.getArticle}
            articles={this.state.articles}
          />
        )} />
        {/* <Route path="/login" render={(props) => (
          <Login
            {...props}
            setAuthUser={this.setAuthUser}
            loginUser={this.props.authService.loginUser}
          />
        )} /> */}
        <RedirectIfAuth
          path='/login'
          component={Login}
          props={{
            setAuthUser:this.setAuthUser,
            loginUser:this.props.authService.loginUser,
            }
          }
          isAuthenticated={this.state.authUser !== null}
        />
        {/* <Route path="/register" render={(props) => (
          <Signup
            {...props}
            registerUser={this.props.authService.registerUser}
            setAuthUser={this.setAuthUser} />)}
        /> */}
        <RedirectIfAuth
          path='/register'
          component={Signup}
          props={{
            setAuthUser:this.setAuthUser,
            registerUser:this.props.authService.registerUser,
            }
          }
          isAuthenticated={this.state.authUser !== null}
        />
        {
          location.pathname !== '/login' && location.pathname !== '/register' && 
          <Footer />
        }
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
  articleService: PropTypes.objectOf(PropTypes.func).isRequired,
  notyService:PropTypes.objectOf(PropTypes.func).isRequired,
}

export default App;
