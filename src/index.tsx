import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './services/store'
import WelcomePage from './views/welcome';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuizPage from './views/quiz';
import ResultPage from 'views/result';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={WelcomePage}/>
          <Route path="/quiz" exact component={QuizPage}/>
          <Route path="/answers" exact component={ResultPage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
