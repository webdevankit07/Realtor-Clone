import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireStoreDB, firebaseStorage } from '../features/firebaseSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.firebase);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'sell',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        description: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        lat: 0,
        long: 0,
        images: {},
    });
    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        description,
        offer,
        regularPrice,
        discountedPrice,
        lat,
        long,
        images,
    } = formData;

    //! image upload to firebase cloud storage...
    const storeImage = async (image) => {
        const fileName = `${userId}-${image.name}-${uuidv4()}`;
        const storageRef = ref(firebaseStorage, `images/${fileName}`);
        const uploadImageResult = await uploadBytes(storageRef, image);
        const imgPath = uploadImageResult.ref._location.path_;
        const imgUrl = await getDownloadURL(ref(firebaseStorage, imgPath));
        return imgUrl;
    };

    const handleChange = (e) => {
        let boolean = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null;

        //! Files
        if (e.target.files) {
            setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files }));
        }
        //! Text/Boolean/Number
        if (!e.target.files) {
            setFormData((prev) => ({ ...prev, [e.target.name]: boolean ?? e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (discountedPrice >= regularPrice) {
            setLoading(false);
            toast.error('Discounted price must be less than regular price');
            return;
        }
        if (images.length > 6) {
            setLoading(false);
            toast.error('Maximum 6 images are allowed');
            return;
        }

        const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(
            (err) => {
                toast.error('Images not uploaded');
                console.log(err);
                return;
            }
        );

        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp(),
        };
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;

        const document = await addDoc(collection(fireStoreDB, 'listings'), formDataCopy);
        setLoading(false);
        toast.success('Listings added successfully');
        navigate(`/categogry/${formDataCopy.type}/${document.id}`);
    };

    if (loading) return <Spinner />;

    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='mt-6 text-3xl font-bold text-center'>Create a Listing</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p className='mt-6 text-lg font-semibold'>Sell / Rent</p>
                    <div className='flex gap-6'>
                        <button
                            type='button'
                            name='type'
                            value={'sell'}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                type === 'sell' ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            Sell
                        </button>
                        <button
                            type='button'
                            name='type'
                            value={'rent'}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                type === 'rent' ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            Rent
                        </button>
                    </div>
                </div>
                <div>
                    <p className='mt-6 text-lg font-semibold'>Name</p>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        placeholder='Name'
                        maxLength={'32'}
                        minLength={'10'}
                        required
                        className='w-full px-4 py-2 mb-6 text-xl text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600'
                    />
                </div>
                <div className='flex gap-6 mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Beds</p>
                        <input
                            type='number'
                            name='bedrooms'
                            value={bedrooms}
                            min='1'
                            max='50'
                            required
                            onChange={handleChange}
                            className='w-full px-4 py-2 text-xl text-center text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:bg-white focus:text-gray-700 focus:border-slate-600'
                        />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Baths</p>
                        <input
                            type='number'
                            name='bathrooms'
                            value={bathrooms}
                            min='1'
                            max='50'
                            required
                            onChange={handleChange}
                            className='py-2 text-xl text-center text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded w-fullpx-4 focus:bg-white focus:text-gray-700 focus:border-slate-600'
                        />
                    </div>
                </div>
                <div>
                    <p className='mt-6 text-lg font-semibold'>Parking spot</p>
                    <div className='flex gap-6'>
                        <button
                            type='button'
                            name='parking'
                            value={true}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                parking ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            Yes
                        </button>
                        <button
                            type='button'
                            name='parking'
                            value={false}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                parking ? 'bg-white text-black' : 'bg-slate-600 text-white'
                            }`}
                            onClick={handleChange}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div>
                    <p className='mt-6 text-lg font-semibold'>Furnished</p>
                    <div className='flex gap-6'>
                        <button
                            type='button'
                            name='furnished'
                            value={true}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                furnished ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            yes
                        </button>
                        <button
                            type='button'
                            name='furnished'
                            value={false}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                !furnished ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div>
                    <p className='mt-6 text-lg font-semibold'>Address</p>
                    <textarea
                        type='text'
                        name='address'
                        value={address}
                        onChange={handleChange}
                        placeholder='Address'
                        required
                        className='w-full px-4 py-2 mb-6 text-xl text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600'
                    />
                </div>
                <div className='flex gap-6 mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Latitude</p>
                        <input
                            type='text'
                            name='lat'
                            value={lat}
                            required
                            min={-90}
                            max={90}
                            onChange={handleChange}
                            className='w-full px-4 py-2 text-xl text-center text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:bg-white focus:text-gray-700 focus:border-slate-600'
                        />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Longitude</p>
                        <input
                            type='text'
                            name='long'
                            value={long}
                            required
                            min={-180}
                            max={180}
                            onChange={handleChange}
                            className='w-full px-4 py-2 text-xl text-center text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:bg-white focus:text-gray-700 focus:border-slate-600'
                        />
                    </div>
                </div>
                <div>
                    <p className='text-lg font-semibold'>Description</p>
                    <textarea
                        type='text'
                        name='description'
                        value={description}
                        onChange={handleChange}
                        placeholder='Address'
                        required
                        className='w-full px-4 py-2 mb-6 text-xl text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600'
                    />
                </div>
                <div>
                    <p className='text-lg font-semibold'>Offer</p>
                    <div className='flex gap-6'>
                        <button
                            type='button'
                            name='offer'
                            value={true}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                offer ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            yes
                        </button>
                        <button
                            type='button'
                            name='offer'
                            value={false}
                            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                !offer ? 'bg-slate-600 text-white' : 'bg-white text-black'
                            }`}
                            onClick={handleChange}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div className='flex items-center my-6'>
                    <div className=''>
                        <p className='text-lg font-semibold'>Regular Price</p>
                        <div className='flex items-center justify-center gap-6'>
                            <input
                                type='number'
                                name='regularPrice'
                                value={regularPrice}
                                onChange={handleChange}
                                min={50}
                                max={400000000}
                                required
                                className='w-full px-4 py-2 text-xl text-center text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600'
                            />
                            {type === 'rent' && (
                                <div>
                                    <p className='w-full text-base whitespace-nowrap'>$ / Month</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {offer && (
                    <div className='flex items-center my-6'>
                        <div className=''>
                            <p className='text-lg font-semibold'>Discounted Price</p>
                            <div className='flex items-center justify-center gap-6'>
                                <input
                                    type='number'
                                    name='discountedPrice'
                                    value={discountedPrice}
                                    onChange={handleChange}
                                    min={50}
                                    max={400000000}
                                    required={offer}
                                    className='w-full px-4 py-2 text-xl text-center text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600'
                                />
                                {type === 'rent' && (
                                    <div>
                                        <p className='w-full text-base whitespace-nowrap'>
                                            $ / Month
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className='mb-6 space-y-1'>
                    <p className='font-semibold'>Images</p>
                    <p className='text-gray-600'>The first image wiil be the cover (max 6)</p>
                    <input
                        type='file'
                        name='images'
                        onChange={handleChange}
                        accept='.jpg, .png, .jpeg'
                        multiple
                        required
                        className='w-full px-3 py-1.5 bg-white text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out  focus:bg-white focus:border-slate-600'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full py-3 mb-6 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg'
                >
                    Create Listing
                </button>
            </form>
        </main>
    );
};

export default CreateListing;
