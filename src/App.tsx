import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

export const App = () => {
    return (
        <div className='App'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}