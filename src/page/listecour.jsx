
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import  {getALLcouruser} from '../redux/cour'
import CircularProgress from '@mui/material/CircularProgress';

const ListeCourUser=()=>{
const user=JSON.parse(localStorage.getItem('user'));
const {status} = useSelector(state=>state.cour)
const {datauser} = useSelector(state=>state.cour)
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getALLcouruser(user._id))
     },[])
    return<div>
         {status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>:  <div className="card" style={{ padding: "20px", width: "80%",backgroundColor:"#144272" }}>
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{fontSize:"2rem"}}>Liste des cours achetés</h2>
        </div>
      {datauser?.map(item=>
         { return <div style={{padding: "29px",backgroundColor: "#205295",margin: "38PX 39PX 11px"}} >
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className="media align-items-center" style={{display: "flex"}}>
                        <img src={`http://localhost:8000/${item?.image}`} className="d-block  ui-bordered mr-4" alt="" style={{    width:"100px !important",
    height: "62px" ,    margin: "auto"}}/>
                        <div className="media-body ml-2" >
                         
                          <small>
                            <span className="text-muted font-bold">Titre du cours : </span> {item?.titre} 
                            <span className="ui-product-color ui-product-color-sm align-text-bottom" style={{background:"#bdbdbd" ,width:"10px",marginLeft:"5px" , height:"9px"}}></span> &nbsp;
                             &nbsp;
                            <span className="text-muted font-bold">Catégorie : </span>  {item?.categorie}
                           
                          </small>
                          <br/>
                          <small>
                          <span className="text-muted font-bold">Etat du cours :  </span>  {item?.isDeleted ? "n'est pas disponnible" : "Disponible"}
                          </small>
                          <br/>
                          <small>
                          <span className="text-muted font-bold">Langue du cours :  </span>  {item?.langue}
                          </small>
                        </div>
                        </div>
                       <Link to={`/${user?.role==="formateur" ? "formateur" : "user"}/deatillecoursuser/${item?._id}`} style={{ display: "flex", flexDirection: "column",justifyContent: "center" }}> <Button variant="contained">Accéder au cours</Button></Link>
                      </div>
         
           </div>  })}
        </div>}
    </div>
}

export default ListeCourUser;