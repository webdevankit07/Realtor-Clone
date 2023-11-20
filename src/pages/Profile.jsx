import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fireStoreDB, firebaseAuth } from '../features/firebaseSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';

//!recat Icons..
import { FcHome } from 'react-icons/fc';

const Profile = () => {
    const { userName, userEmail, userId } = useSelector((state) => state.firebase);
    const [changeDetail, setChangeDetail] = useState(false);
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

    const handleSubmit = async () => {
        try {
            if (userName !== name) {
                //? update Displayname in firebase auth
                await updateProfile(firebaseAuth.currentUser, {
                    displayName: name,
                });

                //? update name in the firestore
                const docRef = doc(fireStoreDB, 'users', userId);
                await updateDoc(docRef, {
                    name,
                });
            }
            toast.success('Profile Details updated');
        } catch (error) {
            toast.error('Could not update Profile details');
        }
    };

    return (
        <>
            <section className='max-w-6xl mx-auto'>
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
                            disabled={!changeDetail}
                            className={`w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out border border-gray-300 rounded bg-white ${
                                changeDetail && 'bg-red-200 focus:bg-red-200'
                            }`}
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

                        <div className='flex justify-between text-base whitespace-nowrap md:text-lg'>
                            <p className='flex items-center gap-1'>
                                Do you want to change your name?
                                <span
                                    className='text-red-600 transition duration-200 ease-in-out cursor-pointer hover:text-red-700 active:text-red-800'
                                    onClick={() => {
                                        changeDetail && handleSubmit();
                                        setChangeDetail((prev) => !prev);
                                    }}
                                >
                                    {changeDetail ? 'Apply Change' : 'Edit'}
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
                    <button
                        type='submit'
                        className='w-full py-3 my-6 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md cursor-pointer px-7 hover:bg-blue-700 hover:shadow-lg active:bg-blue-800'
                    >
                        <Link
                            to={'/create-listing'}
                            className='flex items-center justify-center gap-2'
                        >
                            <FcHome className='p-1 text-3xl bg-red-200 border-2 rounded-full' />{' '}
                            Sell or rent your home
                        </Link>
                    </button>
                </div>
            </section>
        </>
    );
};

export default Profile;
