import "./App.css";
import { Navbar, RequiresAuth } from "./components/index";
import Mockman from "mockman-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes , Route } from 'react-router-dom';
import { HomePage , SignIn , SignUp , History, Likes, WatchLater, PlayList, SingleVideo} from "./Pages/index";




function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/likes' element={<RequiresAuth><Likes /></RequiresAuth>} />
        <Route path='/history' element={<RequiresAuth><History /></RequiresAuth>} />
        <Route path='/watch-later' element={<RequiresAuth><WatchLater /></RequiresAuth>} />
        <Route path='/playlist' element={<RequiresAuth><PlayList /></RequiresAuth>} />
        <Route path='/videos/:id' exact element={<RequiresAuth><SingleVideo /></RequiresAuth>} />
        <Route path='/mock' element={<Mockman />} />
      </Routes>
      <ToastContainer 
      position="top-right"
      autoClose='1200'
      theme="light"
      />
    </div>
  );
}

export default App;
