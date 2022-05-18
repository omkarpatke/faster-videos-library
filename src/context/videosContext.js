import axios from "axios";
import { createContext , useState , useContext, useEffect } from "react";



const VideosContext = createContext('');
const useVideos = () => useContext(VideosContext);



const VideosContextProvider = ({children}) => {
    const [videos , setVideos] = useState([]);
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
    
    return (<VideosContext.Provider value={{videos, setVideos , setToggleTab, filteredVideos , toggleTab , setFilteredVideos }}>{children}</VideosContext.Provider>)
}

export { useVideos , VideosContextProvider }