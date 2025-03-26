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

        setSearches({ searchArr: searchArr, depId: searchObj.depId})
    }, [searchObj])


    const searchFilter = (docs) => {
        const filteredByAuthor = docs.filter(doc => doc.user.fullName.toLowerCase().includes(searches.searchArr[0] || ''))

        const filteredByTitle = filteredByAuthor.filter(doc => doc.title.toLowerCase().includes(searches.searchArr[1] || ''))

        const filteredByBody = filteredByTitle.filter(doc => doc.body.toLowerCase().includes(searches.searchArr[2] || ''))

        const filteredByDepId = filteredByBody.filter(doc => {
            if (searches.depId === 0 || doc.departmentId === searches.depId) {
                return doc
            }
        })

        return filteredByDepId
    }

    return (
        <SearchContext.Provider value={{ setSearchObj, searchFilter }}>
            {children}
        </SearchContext.Provider>
    )
}