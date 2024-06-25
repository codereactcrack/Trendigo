import { useState } from "react"
import SearchContext from "./SearchContext";

const SearchContextProvider = ({children}) =>{
    const [input,setInput] = useState('');
    return (
        <SearchContext.Provider value={{input,setInput}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider