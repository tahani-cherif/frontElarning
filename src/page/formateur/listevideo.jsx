
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import {getVideoByCour} from '../../redux/video'
import {getALLcoursection} from '../../redux/cour'
import React , {useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ListecourVideoFormateur=()=>{
  const  { id } = useParams();
  const {data} = useSelector(state=>state.video)
  const {section} = useSelector(state=>state.cour)
  const { status } = useSelector(state => state.cour)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(getVideoByCour(id))
    dispatch(getALLcoursection(id))
       },[])
    //    console.log(status!="loading" && section.sort((a, b) => {
    //     return a.order - b.order;
    // }) )
    return <>
          {status==="loading" ? <div style={{display: "flex",
            justifyContent: "center",
            marginTop: "81px"}}><CircularProgress style={{'color': 'white'}} /> </div>:
     <div className="card" style={{ padding: "20px", width: "80%",backgroundColor:"#144272",marginBottom:"20px" }}>
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{fontSize:"2rem"}}>Liste Section de cour </h2>
        </div>

           {
            section.length ===0 ?
            <div style={{padding: "29px",margin: "38PX 39PX 11px",textAlign:"center",fontSize:"29px"}}>Aucune  section 
              </div>
            :
           section.slice().sort((a, b) =>{
            return a.order - b.order;
        })?.map((item,index)=><div style={{padding: "29px",backgroundColor: "#205295",margin: "38PX 39PX 11px"}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            {item?.type==="video" ?<div className="media align-items-center" style={{display: "flex "}}>
              <div className='flex flex-col gap-2'><h5 className='text-2xl'><b>Section {item?.order}: {item?.titre}</b></h5>
            <video controls src={'http://localhost:8000/'+item?.videoUrl} style={{width: "303px",height:"150px"}}></video>
            </div>
                        <div className="media-body" style={{padding:"22px"}} >
                          <div>
                           <div>
                            <span className="text-muted"><b>Catégorie: </b>{item?.categorie}</span>  { '   '}
                            <br/>
                            <span className="text-muted"><b>Durée: </b> {item?.dure} min</span> 
                            <br/>
                            <span className="text-muted"><b>Description: </b> {item?.description}</span> 
                            </div>
                          </div>
                        </div>
            </div> :<div className="media align-items-center" style={{display: "flex"}}>
              <div  className='flex flex-col gap-2'>
                <h5 className='text-2xl'><b>Section {item?.order}: {item?.titre} </b></h5>
            {/* <div style={{width: "303px",height:"150px"}} className='bg-white'>
              <PictureAsPdfIcon style={{color:"red"}}/>
              <Button   variant="contained" startIcon={<ReplayIcon style={{'color': 'white'}} />}  onClick={() => { navigate(`/formateur/updatevideo/${item._id}`) }}>Ouvrire PDF</Button>
            </div> */}
           <a href={'http://localhost:8000/'+item?.file}> <img src='/pdf3.png' alt='' style={{width: "auto",height:"150px"}} className='cursor-pointer'/></a>
            </div>
                        <div className="media-body" style={{padding:"22px"}} >
                          <div>
                           <div>
                            <span className="text-muted"><b>Description: </b> {item?.description}</span> 
                            </div>
                          </div>
                        </div>
            </div>}
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "29px",justifyContent: "center" }}>
                        <Button   variant="outlined" startIcon={<ReplayIcon style={{'color': 'white'}} />} style={{'color': 'white'}} onClick={() => { navigate(`/formateur/${item?.type==="video" ? "updatevideo" :"updatepdf"}/${item._id}`) }}>MODIFIER</Button>
                        </div>
                      </div>
                      </div> 
         )
        } 
         
        </div>}
           </>
}

export default ListecourVideoFormateur;