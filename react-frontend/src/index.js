import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './Components/LoginPage/LoginPage';
import MovieCardComponent from './Components/MovieComponent/MovieCardComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieCardComponent
    title="Card Title"
    imageUrl="https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/morbius_onesheet_1400x2100_he.jpg?itok=-jQVkWIe"
    body="Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here "/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
