import React, { useContext, useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import UserContext from '../../context/AuthContext/UserContext';
import useFetchCollection from '../../hooks/useFetchCollection';
import './css/ProfileType.css';

const ProfileType = () => {
    const { currentUser } = useContext(UserContext);
    const userList = useFetchCollection('users');
    const [userId, setUserId] = useState(null);
    const [popUp, setPopUp] = useState(false);

    const user = userList.find(data => data.userEmail === currentUser.email);
    useEffect(() => {
        if (user) {
            setUserId(user.id);
        }
    }, [userList, currentUser]);

    const sellerHandler = async () => {
        if (userId) {
            const docRef = doc(db, 'users', userId);
            await updateDoc(docRef, {
                type: 'seller'
            });
            setPopUp(false);  // Close the pop-up after successful update
        }
    };

    return (
        <div className='profile-type-container'>
            {user && user.type === 'buyer' && (
                <div className='profile-type-prompt'>
                    <div className='profile-type-text'>Do you want to register yourself as a seller?
                        <button className='profile-type-yes-button' onClick={() => setPopUp(true)}>YES</button>
                    </div>
                    {popUp && (
                        <div className='profile-type-popup'>
                            <p className='profile-type-confirmation-text'>Are you sure? You can't change it again.</p>
                            <div className='profile-type-buttons'>
                                <button className='profile-type-no-button' onClick={() => setPopUp(false)}>No</button>
                                <button className='profile-type-confirm-button' onClick={sellerHandler}>Yes</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileType;
