
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import {getVideoByCour} from '../../redux/video'
import React , {useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router";

const ListecourVideoFormateur=()=>{
  const  { id } = useParams();
  const {data} = useSelector(state=>state.video)
  const { status } = useSelector(state => state.video)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(getVideoByCour(id))
       },[])
    return <>
          {status==="loading" ? <div style={{display: "flex",
            justifyContent: "center",
            marginTop: "81px"}}><CircularProgress style={{'color': 'white'}} /> </div>:
     <div className="card" style={{ padding: "20px", width: "80%",backgroundColor:"#144272",marginBottom:"20px" }}>
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{fontSize:"2rem"}}>Liste Videos de {localStorage.getItem('nomcour')}</h2>
        </div>

           {data?.map(item=><div style={{padding: "29px",backgroundColor: "#205295",margin: "38PX 39PX 11px"}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className="media align-items-center" style={{display: "flex"}}>
            <video controls src={'http://localhost:8000/'+item?.videoUrl} style={{width: "303px"}}></video>
                        <div className="media-body" style={{padding:"22px"}} >
                          <div>
                            <span className="text-muted"><b>Titre: </b>{item?.titre}</span>{' '}
                           <div>
                            <span className="text-muted"><b>Catégorie: </b>{item?.categorie}</span>  { '   '}
                            <br/>
                            <span className="text-muted"><b>Durée: </b> {item?.dure} min</span> 
                            <br/>
                            <span className="text-muted"><b>Description: </b> {item?.description}</span> 
                            </div>
                          </div>
                        </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "29px",justifyContent: "center" }}>
                        <Button   variant="outlined" startIcon={<ReplayIcon style={{'color': 'white'}} />} style={{'color': 'white'}} onClick={() => { navigate(`/formateur/updatevideo/${item._id}`) }}>MODIFIER</Button>
                        </div>
                      </div>
                      </div> 
         ) 
        } 
         
        </div>}
           </>
}

export default ListecourVideoFormateur;