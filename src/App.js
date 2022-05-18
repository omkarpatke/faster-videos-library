import "./App.css";
import { Navbar } from "./components/index";
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
        <Route path='/likes' element={<Likes />} />
        <Route path='/history' element={<History />} />
        <Route path='/watch-later' element={<WatchLater />} />
        <Route path='/playlist' element={<PlayList />} />
        <Route path='/videos/:id' exact element={<SingleVideo />} />
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
