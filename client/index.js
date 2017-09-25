import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom'
import routes from './routes/index';
// import Signup from './components/Signup/Signup';
// import Login from './components/Login/Login'
// import Homepage from './components/Homepage/Homepage'
// import RecipePage from './components/RecipePage/RecipePage'
import './public/styles/style.scss';




render(
<Router history={ browserHistory } routes={ routes} />,
document.getElementById('app')
);

// render((
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ), document.getElementById('app'));
