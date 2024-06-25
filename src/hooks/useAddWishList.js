import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import UserContext from "../context/AuthContext/UserContext";
import useFetchCollection from "./useFetchCollection";

const useAddWishList = () => {
  const users = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const addWishListItem = async (itemId) => {
    if (!users || !currentUser) return;
    const findUser = users.find(data => data.userEmail === currentUser.email);
    if (findUser) {
      const docRef = doc(db, 'users', findUser.id);
      try {
        await updateDoc(docRef, {
          wishListItems: arrayUnion(itemId)
        });
        alert('Added to wishlist')
      } catch (error) {
        console.error('Error adding item to wishlist: ', error);
      }
    } else {
      navigate('/login');
    }
  };

  return addWishListItem;
};

export default useAddWishList;
