import { useState } from 'react';

const CreateListing = () => {
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
    } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='mt-6 text-3xl font-bold text-center'>Create a Listing</h1>
            <form>
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
