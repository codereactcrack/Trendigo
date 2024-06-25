import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";

const useFetchCollection =(collectionName)=>{
    const [list, setList] = useState([]);
    const productCollectionRef = collection(db, collectionName);
    useEffect(() => {
        const unsub = onSnapshot(productCollectionRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setList(data);
        });
    
        return () => {
          unsub();
        };
      }, []);
    return list
}

export default useFetchCollection;