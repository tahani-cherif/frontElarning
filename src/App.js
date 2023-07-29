import "./App.css";
import { createContext, useState } from "react";
import Login from "./page/login";
import SignUp from "./page/signup";
import Dashboard from "./page/admin/dashbord";
import Passwordsend from "./page/sendpassword";
import Navbar from "../src/component/navbar";
import { Menu } from "../src/component/Sidebar";
import Reset from "./page/rest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import { ReactDimmer } from "react-dimmer";
import Listeuser from "./page/admin/listuser";
import ListeCourAdmin from "./page/admin/listcour";
import ListecommandeAdmin from "./page/admin/listecommande";
import ListeCategory from "./page/admin/listcategory";
import Cart from "./page/cart";
import Editprofile from "./page/editprofile";
import ListeCourUser from "./page/listecour";
import SingleCoursePageuser from "./page/singlecouruser";
import ListeCourFormateur from "./page/formateur/listecour";
import ListecourVideoFormateur from "./page/formateur/listevideo";
import UploadCours from "./page/formateur/uploadcour";
import UpdateCours from "./page/formateur/updatecour";
import Uploadpdf from "./page/formateur/uploadpdf";
import UploadVideoPage from "./page/formateur/uploadvideo";
import UpdateVideoPage from "./page/formateur/updatevideo";
import Detaillecour from "./page/detaillecour";
import Footer from "./component/footer";

export const RecoveryContext = createContext();

const LinkAdmin = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/listeuser" element={<Listeuser />} />
      <Route path="/listecouradmin" element={<ListeCourAdmin />} />
      <Route path="/listecommande" element={<ListecommandeAdmin />} />
      <Route path="/listecategory" element={<ListeCategory />} />
    </Routes>
  );
};
const LinkFormateur = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/listecour" element={<ListeCourUser />} />
      <Route path="/listecourformateur" element={<ListeCourFormateur />} />
      <Route path="/deatillecoursuser/:id" element={<SingleCoursePageuser />} />
      <Route
        path="/listevideobycour/:id"
        element={<ListecourVideoFormateur />}
      />
      <Route path="/creationcour" element={<UploadCours />} />
      <Route path="/updatecours/:id" element={<UpdateCours />} />
      <Route path="/uploadpdf/:id" element={<Uploadpdf />} />
      <Route path="/uploadvideo/:id" element={<UploadVideoPage />} />
      <Route path="/updatevideo/:id" element={<UpdateVideoPage />} />
      <Route path="/deatillecours/:id" element={<Detaillecour />} />
    </Routes>
  );
};
const LinkUser = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/listecour" element={<ListeCourUser />} />
      <Route path="/deatillecoursuser/:id" element={<SingleCoursePageuser />} />
      <Route path="/deatillecours/:id" element={<Detaillecour />} />
    </Routes>
  );
};
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
    <RecoveryContext.Provider
      className="App"
      value={{ page, setPage, otp, setOTP, setEmail, email, user, setUser }}
    >
      <BrowserRouter>
        <Navbar handleMenu={handleMenu} />
        {localStorage.getItem("tocken") ? (
          <>
            <Menu isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
            <ReactDimmer
              isOpen={isMenuOpen}
              exitDimmer={setMenu}
              zIndex={100}
              blur={1.5}
            ></ReactDimmer>
          </>
        ) : null}
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/passwordrecovery" exact element={<Passwordsend />} />
          <Route path="/reset" exact element={<Reset />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/admin/*" exact element={<LinkAdmin />} />
          <Route path="/formateur/*" exact element={<LinkFormateur />} />
          <Route path="/user/*" exact element={<LinkUser />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/editprofile" exact element={<Editprofile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoveryContext.Provider>
  );
}

export default App;
