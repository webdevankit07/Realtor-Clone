/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    return (
        <section>
            <h1 className='mt-6 text-3xl font-bold text-center'>Forgot Password</h1>
            <div className='flex flex-wrap items-center justify-center max-w-6xl px-6 py-12 mx-auto'>
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img
                        src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww'
                        alt='key'
                        className='w-full rounded-xl'
                    />
                </div>
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                    <form>
                        <input
                            required
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email address'
                            className='w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out bg-white border-gray-300 rounded'
                        />
                        <div className='flex items-center justify-between my-6 text-sm whitespace-nowrap sm:text-lg'>
                            <p>
                                Don't have a account?
                                <Link
                                    to={'/sign-up'}
                                    className='ml-1 text-red-600 transition duration-200 hover:text-red-700'
                                >
                                    Register
                                </Link>
                            </p>
                            <p>
                                <Link
                                    to={'/sign-in'}
                                    className='text-blue-600 transition duration-200 hover:text-blue-800'
                                >
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                        <button
                            type='submit'
                            className='w-full py-3 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg active:bg-blue-800'
                        >
                            Send reset password
                        </button>
                        <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                            <p className='mx-4 font-semibold text-center'>OR</p>
                        </div>
                        <OAuth />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
