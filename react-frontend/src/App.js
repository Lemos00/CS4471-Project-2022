import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import MainPages from './Components/MainPages/MainPages';
import React from 'react';

function App() {

    const [showLogin, setShowLogin] = React.useState(true);

    return (
    <div className="App">
        {showLogin ? <LoginPage setShowLogin={setShowLogin}/>
            : <MainPages setShowLogin={setShowLogin}/>}
    </div>
    );
}

export default App;
