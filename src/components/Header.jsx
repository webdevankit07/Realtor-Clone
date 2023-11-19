import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const { login } = useSelector((state) => state.firebase);
    const location = useLocation();
    const navigate = useNavigate();

    const pathMatchRoute = (route) => {
        return route === location.pathname;
    };

    return (
        <div className='sticky top-0 z-50 bg-white border-b shadow-sm'>
            <header className='flex items-center justify-between max-w-6xl px-3 mx-auto'>
                <div>
                    <img
                        src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
                        alt='logo'
                        className='h-5 cursor-pointer'
                        onClick={() => navigate('/')}
                    />
                </div>
                <div>
                    <ul className='flex gap-x-10'>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px]  ${
                                pathMatchRoute('/')
                                    ? 'text-black border-b-red-500'
                                    : 'text-gray-400 border-b-transparent'
                            }`}
                            onClick={() => navigate('/')}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px]  ${
                                pathMatchRoute('/offers')
                                    ? 'text-black border-b-red-500'
                                    : 'text-gray-400 border-b-transparent'
                            }`}
                            onClick={() => navigate('/offers')}
                        >
                            Offers
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px]  ${
                                pathMatchRoute('/sign-in') || pathMatchRoute('/profile')
                                    ? 'text-black border-b-red-500'
                                    : 'text-gray-400 border-b-transparent'
                            }`}
                            onClick={() => navigate(login ? '/profile' : '/sign-in')}
                        >
                            {login ? 'Profile' : 'Sign In'}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
};

export default Header;
