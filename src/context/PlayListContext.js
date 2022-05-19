import { createContext , useContext , useReducer } from "react";



const PlayListContext = createContext('');

const usePlayListContext = () => useContext(PlayListContext);



const PlayListContextProvider = ({children}) => {
    const playlistReducer = (accu , action) => {
        switch(action.type){
            case 'PLAYLIST_VIDEO':
                return {...accu ,type: action.type , payload: action.payload}

            case 'NEW_PLAYLIST':
                return {...accu ,type: action.type , payload: action.payload}

            case 'REMOVE_PLAYLIST':
                return {...accu ,type: action.type , payload: action.payload}

            case 'ADD_VIDEO_TO_PLAYLIST':
                return {...accu ,type: action.type , payload: action.payload}

            case 'REMOVE_DATA_FROM_PLAYLIST':
                return {...accu , type: action.type , payload : action.payload}
    
            default : 
               return {...accu}
        }
    }

    const [playListState , playListDispatch] = useReducer(playlistReducer , {type:'none' , payload:'none'})
    return (<PlayListContext.Provider value={{playListState,playListDispatch}}>{children}</PlayListContext.Provider>)
}

export { PlayListContextProvider , usePlayListContext };