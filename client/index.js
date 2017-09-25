import React from 'react';
import { render } from 'react-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login'
import Homepage from './components/Homepage/Homepage'
import RecipePage from './components/RecipePage/RecipePage'
import './public/styles/style.scss';




render(<Homepage />, document.getElementById('app'));
