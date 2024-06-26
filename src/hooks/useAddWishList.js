import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import UserContext from "../context/AuthContext/UserContext";
import useFetchCollection from "./useFetchCollection";
import toast from "react-hot-toast";

const useAddWishList = () => {
  const users = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const addWishListItem = async (itemId) => {
    if (!users || !currentUser) {
      navigate('/login');
      return
    };
    const findUser = users.find(data => data.userEmail === currentUser.email);
    if (findUser) {
      const docRef = doc(db, 'users', findUser.id);
      try {
        await updateDoc(docRef, {
          wishListItems: arrayUnion(itemId)
        });
        toast.success('Added to wishlist');
      } catch (error) {
        toast.error('Error in adding item to wishlist')
        console.error('Error adding item to wishlist: ', error);
      }
    } else {
      navigate('/login');
      return
    }
  };

  return addWishListItem;
};

export default useAddWishList;
