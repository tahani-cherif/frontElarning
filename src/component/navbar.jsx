import React from 'react'
import { Link  } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {
  ShoppingCartIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { useDispatch,useSelector } from 'react-redux';
// import  {getuserbyid,notifs,updatenotifs} from '../redux/login'
// import  {searchcour} from '../redux/coursSlice'
import { useEffect, useState,useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

function Navbar({handleMenu,setnav}) {
  
    const user=JSON.parse(localStorage.getItem('user'));

    console.log(user)
  const navigate = useNavigate();
  const {data} = useSelector(state=>state.user)
  const {datacart} = useSelector(state=>state.cart)
  const dispatch = useDispatch();
  const handleClick = () => {
    // setnav(false)
    navigate('/login')};
    const [search,setSearch]=useState('')
  return (
    <div style={{backgroundColor:"#144272"}}>
      <div className="flex space-x-4  h-[74px] shadow-lg text-center justify-between items-center px-4">
        <MenuIcon className="h-6 " onClick={handleMenu} style={{cursor: "url(hand.cur), pointer",color:"white"}}/>
        <Link to={user?.role==="admin" ?"/admin" :user?.role==="formateur" ? "/formateur" : user?.role==="user"? "/user" :"/"}><h2 className="text-3xl font-bold" style={{fontFamily: "cursive",color:"white"}}>SmartLearn</h2></Link>
        <div className='hidden bg-[#f8fafb] md:flex border border-black rounded-3xl flex-1 h-12 items-center'>
          <SearchIcon className="h-5 w-5 mx-4 text-gray" style={{color:"#144272"}}/>
          <input type="text" placeholder='Rechercher' name="txt" className='bg-transparent text-sm outline-none ' value={search} onChange={(e)=>{ 
           setSearch(e.target.value);
            // dispatch(searchcour(e.target.value))  
        }}
        style={{color:"#144272"}}
            />
        </div>
        <div className='flex'>
          <SearchIcon className='h-6 w-6 text-gray-400 md:hidden' />
         {user?.role==="admin"? null :<><Link to="/user/cart" className='cart-btn' ><ShoppingCartIcon className='h-6 w-6 cursor-pointer '  style={{color:"white"}}/>
          </Link>
          {user?.role!="admin" ? <span className='item-counts-badge bg-orange-400 absolute rigth-10 top-10 text-xs font-bold block w-23 h-23 text-white rounded-full flex justify-center items-center' style={{backgroundColor:"#2C74B3",width:"15px"}}>{datacart?.length}</span> :null}
          </> }</div>
        <div className='hidden md:flex pr-4 space-x-4 justify-end' >
          {localStorage.getItem('tocken')!=null ?<Link to={'/editprofile'}><Avatar alt="Remy Sharp" src={user?.image  ? "http://localhost:8000/"+user?.image : "./images.png" }  /> </Link>:<Link to="/login"><button className='border border-black h-10 text-sm font-bold w-29 ' style={{borderRadius: "7px",padding: "10px",backgroundColor:"#2C74B3",    borderLeftColor: "#2C74B3",
    borderRightColor: "#2C74B3",borderBlockColor: "#2C74B3",color:"white"}} >Se connecter</button>
          </Link>}
       {  localStorage.getItem('tocken') ? null :  <Link to="/signup"><button className='border bg-black text-white border-black h-10 text-sm font-bold w-20 '  style={{borderRadius: "7px",padding: "10px",backgroundColor:"#2C74B3",    borderLeftColor: "#2C74B3",
    borderRightColor: "#2C74B3",borderBlockColor: "#2C74B3",color:"white"}}>S'inscrire</button>
          </Link>}
       {  localStorage.getItem('tocken') ? <button className=' w-10 flex items-center justify-center hover:bg-[#F5F5F5]'onClick={()=>{
         localStorage.clear();
            // navigate('/login')
            handleClick()
        }}>
            <LogoutIcon className='h-5 w-5' />
          </button>:null}
        </div>
      </div>
    </div>
  )
}

export default Navbar