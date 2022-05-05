import axios from "axios";
import { createContext , useState , useContext, useEffect } from "react";



const VideosContext = createContext('');
const useVideos = () => useContext(VideosContext);



const VideosContextProvider = ({children}) => {
    const [videos , setVideos] = useState([]);

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
    
    return (<VideosContext.Provider value={{videos,setVideos}}>{children}</VideosContext.Provider>)
}

export { useVideos , VideosContextProvider }