import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//! pages....
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import NotFound from './pages/NotFound';
import Header from './components/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
    firebaseAuth,
    setLoadingState,
    setLoginState,
    setUserData,
} from './features/firebaseSlice';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';

const App = () => {
    const { login } = useSelector((state) => state.firebase);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            dispatch(setLoadingState(true));
            const userData = {
                userName: user ? user.displayName : null,
                userEmail: user ? user.email : null,
                userId: user ? user.uid : null,
                photoURL: user ? user.photoURL : null,
            };
            dispatch(setLoginState(user ? true : false));
            dispatch(setUserData(userData));
            dispatch(setLoadingState(false));
        });
    }, [login, dispatch]);

    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route path='/create-listing' element={<CreateListing />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </>
    );
};

export default App;
