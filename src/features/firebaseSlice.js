import { createSlice } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCqcBXc5xnaJaTJq7beA_f1I0GIBiE5Zx0',
    authDomain: 'realtor-clone-react-f47ac.firebaseapp.com',
    projectId: 'realtor-clone-react-f47ac',
    storageBucket: 'realtor-clone-react-f47ac.appspot.com',
    messagingSenderId: '281576334752',
    appId: '1:281576334752:web:820300632a54f489e1f0c5',
};

//! .......... initialization ............
export const firebaseApp = initializeApp(firebaseConfig);
export const fireStoreDB = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

//! .................... Firebase SLice ...................
const initialState = {
    loading: false,
};
const firebaseSlice = createSlice({
    name: 'firebaseSlice',
    initialState,
    reducers: {},
});

export default firebaseSlice.reducer;
// export const {} = firebaseSlice.actions;
