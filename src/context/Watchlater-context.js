import { createContext , useContext , useReducer } from "react";



const WatchLaterContext = createContext('');

const useWatchlaterContext = () => useContext(WatchLaterContext);



const WatchLaterContextProvider = ({children}) => {
    const watchLaterReducer = (accu , action) => {
        switch(action.type){
            case 'WATCHLATER_VIDEO':
                return {...accu ,type: action.type , payload: action.payload}

            case 'REMOVE_WATCHLATER_VIDEO':
                return {...accu ,type: action.type , payload: action.payload}
    
            default : 
               return {...accu}
        }
    }

    const [ watchLaterState , watchLaterDispatch] = useReducer(watchLaterReducer , {type:'none' , payload:'none'})
    return (<WatchLaterContext.Provider value={{watchLaterState,watchLaterDispatch}}>{children}</WatchLaterContext.Provider>)
}

export { WatchLaterContextProvider , useWatchlaterContext }