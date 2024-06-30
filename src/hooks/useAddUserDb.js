
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';

const useAddUserDb = async (userAuth) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('userEmail', '==', userAuth.user.email));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        await addDoc(userRef, {
            userName: userAuth.user.displayName,
            userEmail: userAuth.user.email,
            profilePhoto: userAuth.user.photoURL,
            type:'buyer',
            wishListItems: [],
            cartItems: []
        });
    }
};

export default useAddUserDb;
