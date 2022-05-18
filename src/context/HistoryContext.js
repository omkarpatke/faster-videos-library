import { createContext , useContext , useReducer } from "react";



const HistoryContext = createContext('');

const useHistoryContext = () => useContext(HistoryContext);



const HistoryVideoContextProvider = ({children}) => {
    const historyVideosReducer = (accu , action) => {
        switch(action.type){
            case 'HISTORY_VIDEO':
                return {...accu ,type: action.type , payload: action.payload}

            case 'REMOVE_HISTORY_VIDEO':
                return {...accu ,type: action.type , payload: action.payload}
    
            default : 
               return {...accu}
        }
    }

    const [historyVideosState , historyVideosDispatch] = useReducer(historyVideosReducer , {type:'none' , payload:'none'})
    return (<HistoryContext.Provider value={{historyVideosState,historyVideosDispatch}}>{children}</HistoryContext.Provider>)
}

export { HistoryVideoContextProvider , useHistoryContext }