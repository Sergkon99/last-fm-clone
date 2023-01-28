import { Routes, Route, Link } from "react-router-dom";
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Search } from './components/Search/Search';

export const App = () => {
    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='search/:searchValue' element={<Search />} />
                <Route path='*' element={
                    <div className="main-page">
                        <h1>Страница не найдена</h1>
                        <div><Link to='/'>Вернуться на главную</Link></div>
                    </div>
                } />
            </Routes>
            <Footer />
        </div>
    );
}