import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import "./detaillecour.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {getcourbyid} from '../redux/cour'
import {getVideoByCour} from '../redux/video'
import QuizIcon from '@mui/icons-material/Quiz';
// import {getVideoById} from '../redux/video'
import Avatar from '@mui/material/Avatar';
import {getALLcoursection} from '../redux/cour'

const Detaillecour=()=>{
  const  { id } = useParams();
  const {error} = useSelector(state=>state.cour)
  const {status} = useSelector(state=>state.cour)
  const {data} = useSelector(state=>state.cour)
  const {datavideo} = useSelector(state=>state.video)
  const {section} = useSelector(state=>state.cour);
  const dispatch = useDispatch();
  const [video1,setvideo1]=useState()
  useEffect(()=>{
    dispatch(getcourbyid(id))
    dispatch(getALLcoursection(id))
    dispatch(getVideoByCour(id)).then(secc=>{
      const x=secc?.payload
       setvideo1(x[0])
    })
    localStorage.setItem('courid',id)
       },[])
       let time=0
       datavideo?.map(item=>
        {   if(item.dure==="")
            { time+=Number(item.dure)}
          else {
            time+=Number(item.dure)
       }})
return (
    <SingleCoursePageWrapper>
      <div className='conetnaire' style={{ rowGap: "24px"}}>
      <div className="Box"> 
        <div className='minibox'>
          <h1 className='title'>{data?.titre}</h1>
            <div style={{display:"flex",gap: "24px"}}>
    <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={data?.createur?.image  ? "http://localhost:8000/"+data?.createur?.image : "./images.png" }  /> 
            <p className='createur' style={{marginTop: "33px"}}>Créé par {data?.createur?.fullName}</p>
            </div>
          </div>
        <div className='minibox2'>
        <video controls src={"http://localhost:8000/"+video1?.videoUrl} width={300}  style={{height:"200px"}}></video>
          <p className='title2'>Ce cours comprend :</p>
          <div style={{marginTop:"20px"}}>
            <div className='boxicon'>
             <VideoChatIcon/>
             <p>{  data?.videoId?.length} Videos</p>
            </div>
            <div className='boxicon'>
              <AutoStoriesIcon/>
              <p>{ section?.length-data?.videoId?.length >=0 ? section?.length-data?.videoId?.length : 0}  PDF </p>
            </div>
          </div>
       
        </div>

      </div>
      <div style={{overflow: "hidden",
    padding: "25px",
    borderRadius:"15px",
    border: "1px solid #144272",
    margin: "25px 0",
    background: "#144272",
    width: "659px",
    marginLeft: "100px"}}>
    <h4 style={{marginBottom: "15px",
    textTransform: "capitalize",
    position: "relative",
    paddingBottom: "10px",
    fontSize: "24px"}}>Description</h4>
    <hr style={{ 
    left: "0",
    bottom: "0",
    width: "40px",
    height: "2px",
    backgroundColor: "#222",
    marginBottom:"10px"}}/>
      <p   style={{color:"white"}}>{data?.description}</p>
      </div>
      <div style={{overflow: "hidden",
    padding: "25px",
    borderRadius:"15px",
    border: "1px solid #144272",
    margin: "25px 0",
    backgroundColor: "#144272",
    width: "659px",
    marginLeft: "100px"}}>
    <h4 style={{marginBottom: "15px",
    textTransform: "capitalize",
    position: "relative",
    paddingBottom: "10px",
    fontSize: "24px"}}>Ce que vous apprenez</h4>
    <hr style={{ 
    left: "0",
    bottom: "0",
    width: "40px",
    height: "2px",
    backgroundColor: "#222",
    marginBottom:"10px"}}/>
      <p   style={{color:"white"}}>{data?.ce_que_vous_apprenez}</p>
      </div>
      <div style={{    width: "87%",
    margin: "auto",marginTop:"20px",marginBottom: "-300px"}}>
      <h2 className='title2' style={{fontSize:"1.8rem",marginBottom:"20px"}}>Contenu du cours</h2>
      <div style={{marginTop:"60px"}}>
      <p style={{marginBottom:"20px"}}>{section?.length}  Section Video • Durée totale: {time} min</p>
     { section?.map(item=>
      { 
        return <Accordion style={{color:"white",backgroundColor:"#144272"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{ color: 'white' }}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  sx={{ width: '95%', flexShrink: 0 }}>Section {item?.order}:{item?.titre}</Typography>
          {item?.type==="video" && <Typography sx={{ color: 'white' }} >{item?.dure} min</Typography>}
        </AccordionSummary>
        <AccordionDetails>
         <Typography>
           {item?.description}
          </Typography>
        </AccordionDetails>
      </Accordion>})}
    </div>
    </div>
   </div>
    </SingleCoursePageWrapper>
)
          }
const SingleCoursePageWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para{
      padding: 12px 0;
    }
    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count{
      margin-left: 8px;
    }
    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info{
      li{
        margin-bottom: 2px;
        &:nth-child(2){
          margin-top: 10px;
        }
      }
      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;
      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn{
      margin-top: 16px;
      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details{
        padding-top: 0;
      }
      .course-img{
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;
    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        li{
          margin: 5px 0;
          display: flex;
          span{
            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{
        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }

`;

export default Detaillecour;