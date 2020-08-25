import React from 'react';
import './assets/css/App.css';
import MainPage from './components/MainPage.js';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <MainPage/>
            </div>
        );
    }
}

export default App;
