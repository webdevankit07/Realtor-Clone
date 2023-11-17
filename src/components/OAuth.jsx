import { FcGoogle } from 'react-icons/fc';

const OAuth = () => {
    return (
        <button className='flex items-center justify-center w-full py-3 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-red-700 rounded shadow-md px-7 hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg'>
            <FcGoogle className='mr-2 text-2xl bg-white rounded-full' /> Continue with Google
        </button>
    );
};

export default OAuth;
