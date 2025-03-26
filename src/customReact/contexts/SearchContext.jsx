import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(undefined)

export const SearchProvider = ({ children }) => {
    const [searches, setSearches] = useState({})
    const [searchObj, setSearchObj] = useState({
        str: '',
        depId: 0
    })

    useEffect(() => {
        const searchArr = searchObj.str.toLowerCase().split('/')
        searchArr.push(searchObj.depId)

        setSearches({ searchArr: searchArr, depId: searchObj.depId})
    }, [searchObj])


    const name = (docs) => {
        const filteredByAuthor = docs.filter(doc => doc.fullName.toLowerCase().includes(searches.searchArr[0]))

        return filteredByAuthor
    }

    return (
        <SearchContext.Provider value={{ setSearchObj, name }}>
            {children}
        </SearchContext.Provider>
    )
}