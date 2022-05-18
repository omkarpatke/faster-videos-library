import axios from "axios";
import { createContext , useState , useContext, useEffect , useReducer } from "react";



const VideosContext = createContext('');
const useVideos = () => useContext(VideosContext);



const VideosContextProvider = ({children}) => {
    const [videos , setVideos] = useState([]);


    const videosReducer = (accu , action) => {
        switch(action.type){
            case 'LIKE_VIDEO':
                return {...accu , type: action.type , payload: action.payload}
    
            case 'DISLIKE_VIDEO':
                return {...accu ,type: action.type , payload: action.payload}
    
            default : 
               return {...accu}
        }
    }

    const [videoState , videoDispatch] = useReducer(videosReducer , {type:'none' , payload:'none'})


    const [toggleTab , setToggleTab] = useState('All');
    const [filteredVideos , setFilteredVideos] = useState([]);
    

    useEffect(() => {
        const fetchData = async() => {
        try{
            const response = await axios.get('/api/videos');
            setVideos(response.data.videos);
        }
        catch(err){
            console.err(err);
        }
    }
    fetchData();
    },[]);

    useEffect(() => {
       if(toggleTab === 'All'){
           setFilteredVideos(videos);
       }else{
           setFilteredVideos(videos.filter(item => item.categoryName === toggleTab ));
           
       }
    },[toggleTab, videos])
    

    return (<VideosContext.Provider value={{videos,setVideos, videoState,videoDispatch }}>{children}</VideosContext.Provider>)

    return (<VideosContext.Provider value={{videos, setVideos , setToggleTab, filteredVideos , toggleTab , setFilteredVideos }}>{children}</VideosContext.Provider>)

}

export { useVideos , VideosContextProvider }