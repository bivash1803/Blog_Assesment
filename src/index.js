import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import CreateArticle from './Components/CreateArticle';
import SingleArticle from './Components/SingleArticle';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import AuthService from './services/auth';
import ArticleService from './services/article';
import NotificationService from './services/notification';

const Main = withRouter((props) => {
  return (
    <App
      authService={new AuthService()}
      articleService = {new ArticleService()}
      notyService={new NotificationService}
      {...props} />
  )
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>

    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
