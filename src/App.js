import './App.css';
import { createContext,useState } from "react";
import Login from './page/login';
import SignUp from './page/signup';
import Dashboard from './page/admin/dashbord';
import Passwordsend from './page/sendpassword';
import Navbar from '../src/component/navbar';
import { Menu }  from '../src/component/Sidebar';
import Reset from './page/rest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import { ReactDimmer } from "react-dimmer";
import Listeuser from './page/admin/listuser';
import ListeCourAdmin from './page/admin/listcour';
import ListecommandeAdmin from './page/admin/listecommande';
import ListeCategory from './page/admin/listcategory';

export const RecoveryContext = createContext();


const LinkAdmin = () => {

  return <Routes>
   <Route path="/" exact element={<Dashboard />} />
    <Route path="/listeuser"  element={<Listeuser />} />
    <Route path="/listecouradmin"  element={<ListeCourAdmin/>} />
    <Route path="/listecommande"  element={<ListecommandeAdmin/>} />
    <Route path="/listecategory"  element={<ListeCategory/>} />

  </Routes>
}

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [nav, setNav] = useState();
  const [user, setUser] = useState({});
  const [otp, setOTP] = useState();
  const [isMenuOpen, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <RecoveryContext.Provider className="App"
    value={{ page, setPage, otp, setOTP, setEmail, email,user,setUser }}
  >
    <BrowserRouter>
    <Navbar handleMenu={handleMenu}/>
    {localStorage.getItem('tocken') ?
       <><Menu isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
            <ReactDimmer
              isOpen={isMenuOpen}
              exitDimmer={setMenu}
              zIndex={100}
              blur={1.5}
            >
              </ReactDimmer></> : null}
    <Routes>
    <Route path="login" element={<Login/>} />
    <Route path="signup" element={<SignUp/>} />
    <Route path="/passwordrecovery" exact element={<Passwordsend />} />
    <Route path="/reset" exact element={<Reset />} />
    <Route path="/" exact element={<Home />} />
    <Route path="/admin/*" exact element={<LinkAdmin />} />
    </Routes>
    </BrowserRouter>
      </RecoveryContext.Provider>

  );
}

export default App;
