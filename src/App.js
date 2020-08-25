import React from 'react';
import './assets/css/App.css';
import MainPage from './components/MainPage.js';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                        <MainPage/>
                </header>
            </div>
        );
    }
}

export default App;
