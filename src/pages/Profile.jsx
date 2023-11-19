import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { firebaseAuth } from '../features/firebaseSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userName, userEmail } = useSelector((state) => state.firebase);
    const [formData, setFormData] = useState({
        name: userName,
        email: userEmail,
    });
    const { name, email } = formData;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const loggedOut = () => {
        signOut(firebaseAuth);
        navigate('/');
    };

    return (
        <>
            <section className='max-w-6xl'>
                <h1 className='mt-6 text-3xl font-bold text-center'>My Profile</h1>
                <div className='w-full md:w-[70%] lg:w-[50%] mt-6 px-3 mx-auto'>
                    <form>
                        {/*//? Name Input  */}
                        <input
                            autoComplete='off'
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            disabled
                            className='w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded'
                        />

                        {/*//? Email Input  */}
                        <input
                            type='email'
                            autoComplete='off'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            disabled
                            className='w-full px-4 py-2 my-6 text-xl text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded'
                        />

                        <div className='flex justify-between text-sm whitespace-nowrap md:text-lg'>
                            <p className='flex items-center gap-1'>
                                Do you want to change your name?
                                <span className='text-red-600 transition duration-200 ease-in-out cursor-pointer hover:text-red-700 active:text-red-800'>
                                    Edit
                                </span>
                            </p>
                            <p
                                className='text-blue-600 transition duration-200 ease-in-out cursor-pointer hover:text-blue-800'
                                onClick={loggedOut}
                            >
                                Sign out
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Profile;
