import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
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
                            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                                pathMatchRoute('/') && 'text-black border-b-red-500'
                            }`}
                            onClick={() => navigate('/')}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                                pathMatchRoute('/offers') && 'text-black border-b-red-500'
                            }`}
                            onClick={() => navigate('/offers')}
                        >
                            Offers
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                                pathMatchRoute('/sign-in') && 'text-black border-b-red-500'
                            }`}
                            onClick={() => navigate('/sign-in')}
                        >
                            Sign In
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
};

export default Header;
