import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { fireStoreDB, firebaseAuth } from '../features/firebaseSlice';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(firebaseAuth, googleProvider);

            const userData = {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
            };

            const docSnap = await getDoc(doc(fireStoreDB, 'users', user.uid));
            if (!docSnap.exists()) {
                await setDoc(doc(fireStoreDB, 'users', user.uid), userData);
            }

            navigate('/');
            toast.success('Signin successful');
        } catch (error) {
            console.log(error);
            toast.error('Could not authorize with google');
        }
    };

    return (
        <button
            type='button'
            className='flex items-center justify-center w-full py-3 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-red-700 rounded shadow-md px-7 hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg'
            onClick={handleClick}
        >
            <FcGoogle className='mr-2 text-2xl bg-white rounded-full' /> Continue with Google
        </button>
    );
};

export default OAuth;
