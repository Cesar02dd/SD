import './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import SearchPage  from './Pages/SearchPage.jsx';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage.jsx';
import EventPage from './Pages/EventPage.jsx';
import MyEventsPage from './Pages/MyEventsPage.jsx';
import SearchEventsPage from './Pages/SearchEventsPage.jsx';
import PaymentPage from './Pages/PaymentPage.jsx';

function App() {
    return (
        <>
            <div className='App'>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home/>}></Route>
                        <Route path='/home' element={<Home/>} />
                        <Route path='/search' element={<SearchPage/>} />
                        <Route path='/register' element={<RegisterPage/>} />
                        <Route path='/login' element={<LoginPage/>} />
                        <Route path='/:event' element={<EventPage/>} />
                        <Route path='/searchEvents' element={<SearchEventsPage/>} />
                        <Route path='/myEvents' element={<MyEventsPage/>} />
                        <Route path='/Payment' element={<PaymentPage/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
