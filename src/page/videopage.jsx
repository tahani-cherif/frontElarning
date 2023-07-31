import React , {useEffect}from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import Comment from "../component/comment";
import Card from "../component/card";
import {Box,Textarea,FormControl,FormLabel} from '@mui/joy';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getVideoByid} from '../redux/video'
import {getcommentbyvideo,addcomment} from '../redux/comment'
import {getVideoByCour} from '../redux/video'
import {getcourbyid} from '../redux/cour'
// import {getpdfbyid} from '../redux/PDF'
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

const VideoPage = () => {
    const  { id } = useParams();
    const user=JSON.parse(localStorage.getItem('user'));
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [test, settest] = React.useState(null);
    const [commenatire, setcommentaire] = React.useState(null);
    const {datavideos} = useSelector(state=>state.video)
    const {datacomment} = useSelector(state=>state.comment)
    const {datavideo} = useSelector(state=>state.video)
    const {data} = useSelector(state=>state.cour)
    const {status} = useSelector(state=>state.cour)
    const {statusvideo} = useSelector(state=>state.video)
    const {statuscomment} = useSelector(state=>state.comment)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getcourbyid(localStorage.getItem('courid')))
        dispatch(getVideoByid(id))
        dispatch(getcommentbyvideo(id))
        dispatch(getVideoByCour(localStorage.getItem('courid')))
           },[])
        console.log(datavideo)
    return (
        <div >
         <div style={{display:"absulte"}}>
         {statuscomment==="loading" || statusvideo==="loading" || status==="loading"? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>: 
        <Container>
            <div className="Content">
                <div className="VideoWrapper">
                    <div className="play-video">
                        <video src={"http://localhost:8000/"+datavideos?.videoUrl} type="/mp4" controls  accelerometer clipboard-write encrypted-media gyroscope picture-in-picture
                            width="100%"
                            height="720"
                        />
                    </div>
                    <div className="">
                        <div style={{ display: "flex",justifyContent: "space-between",marginTop:"20px"}}>
                        <div style={{display: "flex", columnGap: "23px"}}> 
                        <p className="Title">Titre du vidéo : {datavideos?.titre}</p>
                        <p className="Title">Categorie du vidéo : {datavideos?.categorie} </p> 
                        <p className="Title">Formateur : {datavideos?.coatch?.fullName} </p>
                        </div>
                        <p >Durée • {datavideos?.dure} min</p>
                        </div>
                        <div>
                        <div style={{display: "flex",justifyContent: "space-between",marginTop: "13px"}}>
                        <p className="Description"><b>Description: </b>{datavideos?.description}</p>
                        {/* <div className="Detaille" style={{columnGap: "19px"}}   >  
                                <div style={{cursor: "url(hand.cur), pointer"}}><ThumbUpOutlinedIcon color="success"/> <p>123</p></div>
                               <div style={{cursor: "url(hand.cur), pointer"}}> <ThumbDownOffAltOutlinedIcon color="error"/><p>50</p></div>
                            </div> */}
                        </div>
                        </div>
                        <div className="Hr" />
                    </div>
                    <FormControl>
      <FormLabel>Votre commentaire</FormLabel>
      <Textarea
      onChange={(e)=>setcommentaire(e.target.value)}
        placeholder="Tapez quelque chose ici…"
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >

            <Button variant="contained" sx={{ ml: 'auto' }} startIcon={<SendIcon />} color="success" onClick={async()=>{
              dispatch(addcomment({text:commenatire,
     commentBy:user?._id,
     postId:id})).then((secc)=> dispatch(getcommentbyvideo(id)))
    setcommentaire('')
    }}>Envoyer</Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </FormControl>
                  {statuscomment!="loading" && datacomment?.map(item=><Comment  item={item} id={id}/>) }
                </div>
            </div>

            <div className="Recommendation">
               { datavideo?.filter(x=>x?._id!=id)?.sort((a,b)=>a?.ordre-b?.ordre)?.map(item=> <Card item={item} settest={settest}/>) }
            </div>
      
        </Container>}
        </div>
        </div>
    );
};
const Container = styled.div`
  display: flex;

.Content{
  flex: 5;
  margin-left: 40px;
}

.VideoWrapper {
    margin-right: 35px;
    margin-top:40px
}



.Title{
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
}

.Detaille{
    display: flex;
    align-items: center;
    flex-wrap:wrap;
    margin-right: 10px;
    margin-top:10px;
    font-size:14px;
    color:#5a5a5a
    column-gap: 29px;
    
}

.Info {
    color: ${({ theme }) => theme.textSoft};
}

.bbb{
    display: flex;
    gap: 20px;
    color: ${({ theme }) => theme.text};
}

.Button{
    display: flex;
    align - items: center;
    gap: 5px;
    cursor: pointer;
}
.myboutton{
    display: inline - block;
    margin - right: 10px;
}

.Channel{
    display: flex;
    justify - content: space - between;
}

.ChannelInfo {
    display: flex;
    gap: 20px;
}

.Image {
    width: 50px;
    height: 50px;
    border - radius: 50 %;
}

.ChannelDetail{
    display: flex;
    flex - direction: column;
    color: ${({ theme }) => theme.text};
}


.ChannelName{
    font - weight: 500;
}

.ChannelCounter {
    margin - top: 5px;
    margin - bottom: 20px;
    color: ${({ theme }) => theme.textSoft};
    font - size: 12px;
}


.Description {
    font - size: 25px;
    width: 89%;
}

.margin {
    margin - right: 30px
}


.Recommendation{
  flex: 2;
}
.Hr{
    margin: 15px 0px;
    border: 0.1px solid ${({ theme }) => theme.soft};}
  

.Subscribe {
  background-color: red;
  color: #fff;
  border: 0;
  outline:0;
  border-radius:4px;

  border-radius: 3px;
  height: max-content;
  padding: 8px  30px ;
  cursor: pointer;
  width:13%
}
`;
export default VideoPage