import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './pages/register';

function App() {
  return (
    <div className='app'>
      <header></header>
      <nav></nav>
      <main>
        <Register />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
