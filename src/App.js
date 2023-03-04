import './App.css';
import { Navbar } from './components/Navbar';
 import { About } from './components/About';
 import Home from './components/Home';
// Set up a router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  
  return (
    <>
   <BrowserRouter>
    <Navbar/>
    <div class="mt-20">
    {/* <AlertProvider> */}
    <div className="container">
      <Routes>
      <Route  exact path="/" element = {<Home />}>
               
            </Route>
            <Route exact path="/about"  element={<About/>} >
            
            </Route>
            {/* <Route exact path="/login"  element={<Login />} >
            
            </Route>
            <Route exact path="/signup"  element={<SignUp />} >
            
            </Route> */}
          </Routes>
          </div>
          {/* </AlertProvider> */}
          </div>
    </BrowserRouter>
    </>
  );
}

export default App;
