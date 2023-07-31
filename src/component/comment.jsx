import React from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import {Box,Textarea,FormControl,FormLabel} from '@mui/joy';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import {suppcomment,modifcomment,getcommentbyvideo} from '../redux/comment'
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";

const Comment = ({item,id}) => {
    const user=JSON.parse(localStorage.getItem('user'));
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [commnt, setcomment] = React.useState(item?.text);
    const dispatch = useDispatch();
    return (
        <Container>
            <img src={"http://localhost:8000/"+item?.commentBy?.image} alt="" className="Avatar"/>
            <div  className="Details">
                <p className="Name">
                    {item?.commentBy?.fullName} <p className="Date">{moment(item?.createdDate).format("MMM Do YY")}</p>
                </p>
                  <FormControl>
      <FormLabel>Votre commentaire</FormLabel>
      
     {  user?._id=== item?.commentBy?._id ? <Textarea
         defaultValue={commnt}
         onChange={(e)=>setcomment(e.target.value)}
        minRows={3}
        styled={{ color: 'black'}}
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

            <Button  onClick={()=>{
            //   item?.text=commnt
              let x=JSON.parse(JSON.stringify(item))
              x.text=commnt
              dispatch(modifcomment(x)).then((secc)=> dispatch(getcommentbyvideo(id)))
              }} variant="outlined" startIcon={<ReplayIcon />} >MODIFIER</Button>
            <Button   variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={()=>{
             dispatch(suppcomment(item?._id)).then((secc)=> dispatch(getcommentbyvideo(id)))}}> Supprimer</Button>
            <Button disabled variant="contained" sx={{ ml: 'auto' }} startIcon={<SendIcon />} color="success">Envoyer</Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />:
      <Textarea
      disabled
      defaultValue={item?.text}
     minRows={3}
     styled={{ color: 'black'}}
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

         <Button  disabled variant="outlined" startIcon={<ReplayIcon />} >MODIFIER</Button>
         <Button disabled  variant="outlined" startIcon={<DeleteIcon />} color="error" > Supprimer</Button>
         <Button disabled variant="contained" sx={{ ml: 'auto' }} startIcon={<SendIcon />} color="success">Envoyer</Button>
       </Box>
     }
     sx={{
       minWidth: 300,
       fontWeight,
       fontStyle: italic ? 'italic' : 'initial',
     }}
   />}
    </FormControl>
            </div>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;

 .Avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;}

.Details{
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
}
.Name{
  font-size: 13px;
  font-weight: 500;
}
.padding{
    
}


 .myBoutton{
    margin-right: 10px;
    background-color: transparent;
    border: 1px solid black;
    padding: 10px;
    cursor:pointer
}

.Date{
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;}

 .MyText{
  font-size: 14px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding-top:10 px;
  background: transparent;}
`;
export default Comment;