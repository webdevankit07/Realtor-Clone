import { useState } from 'react';
import OAuth from '../components/OAuth';
import { Link, useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { fireStoreDB, firebaseAuth } from '../features/firebaseSlice';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Oval } from 'react-loader-spinner';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            await updateProfile(firebaseAuth.currentUser, {
                displayName: name,
            });
            const userData = { name, email, timestamp: serverTimestamp() };
            await setDoc(doc(fireStoreDB, 'users', userCredentials.user.uid), userData);
            setFormData({
                name: '',
                email: '',
                password: '',
            });
            setLoading(false);
            navigate('/');
            toast.success('Signup was successful');
        } catch (error) {
            toast.error('Something went wrong with the registration');
            setLoading(false);
        }
    };

    return (
        <section>
            <h1 className='mt-6 text-3xl font-bold text-center'>Sign Up</h1>
            <div className='flex flex-wrap items-center justify-center max-w-6xl px-6 py-12 mx-auto'>
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img
                        src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww'
                        alt='key'
                        className='w-full rounded-xl'
                    />
                </div>
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                    <form onSubmit={handleSubmit}>
                        <input
                            required
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='Full Name'
                            className='w-full px-4 py-2 mb-6 text-xl text-gray-700 transition ease-in-out bg-white border-gray-300 rounded'
                        />
                        <input
                            required
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Email address'
                            className='w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out bg-white border-gray-300 rounded'
                        />
                        <div className='relative my-6'>
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={password}
                                onChange={handleChange}
                                placeholder='Password'
                                className='w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out bg-white border-gray-300 rounded'
                            />
                            {showPassword ? (
                                <IoEyeOff
                                    className='absolute text-xl right-3 top-3.5 cursor-pointer'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                            ) : (
                                <IoEye
                                    className='absolute text-xl right-3 top-3.5 cursor-pointer'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                            )}
                        </div>
                        <div className='flex items-center justify-between mb-6 text-sm whitespace-nowrap sm:text-lg'>
                            <p>
                                Have a account?
                                <Link
                                    to={'/sign-in'}
                                    className='ml-1 text-red-600 transition duration-200 hover:text-red-700'
                                >
                                    Sign in
                                </Link>
                            </p>
                            <p>
                                <Link
                                    to={'/forgot-password'}
                                    className='text-blue-600 transition duration-200 hover:text-blue-800'
                                >
                                    Forgot password?
                                </Link>
                            </p>
                        </div>
                        <button
                            type='submit'
                            className='flex items-center justify-center w-full h-12 py-3 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg active:bg-blue-800'
                        >
                            {loading ? (
                                <Oval
                                    height={30}
                                    width={30}
                                    color='#ffffff'
                                    wrapperStyle={{}}
                                    wrapperClass=''
                                    visible={true}
                                    secondaryColor='#ffffff46fff'
                                    strokeWidth={5}
                                    strokeWidthSecondary={5}
                                />
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                        <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                            <p className='mx-4 font-semibold text-center'>OR</p>
                        </div>
                    </form>
                    <OAuth />
                </div>
            </div>
        </section>
    );
};

export default SignUp;
