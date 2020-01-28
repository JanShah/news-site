import React from 'react';
import './CSS/App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
