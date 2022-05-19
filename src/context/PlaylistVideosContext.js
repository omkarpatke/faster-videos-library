import { createContext , useContext , useReducer } from "react";



const PlayListVideosContext = createContext('');

const usePlayListVideosContext = () => useContext(PlayListVideosContext);



const PlayListVideosContextProvider = ({children}) => {
    const playlistVideosReducer = (accu , action) => {
        switch(action.type){
            case 'PLAYLIST_DATA':
                return {...accu , type: action.type , payload : action.payload}
            
            case 'REMOVE_PLAYLIST_DATA':
                return {...accu , type: action.type , payload : action.payload}
    
            default : 
               return {...accu}
        }
    }

    const [playListVideosState , playListVideosDispatch] = useReducer(playlistVideosReducer , {type:'none' , payload:'none'})
    return (<usePlayListVideosContext.Provider value={{playListVideosState,playListVideosDispatch}}>{children}</usePlayListVideosContext.Provider>)
}

export { PlayListVideosContextProvider , usePlayListVideosContext };