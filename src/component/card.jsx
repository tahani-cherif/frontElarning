import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  margin-top: 40px;
  margin-right: 30px
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;
const regleVideo= styled.div`
display: block;
margin: 0 auto;
max-width: 100%;
height: auto;`;

const Texts = styled.div`
display: flex;
flex-direction: row;
    column-gap: 6px;`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  // margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type,item,settest }) => {
  console.log("tt",item)
  return (
    <Container>
     {item?.type==="video" ? <video src={"http://localhost:8000/"+item?.videoUrl} style={{width: "100%",height:"auto"}} type="/mp4" className="regleVideo" controls accelerometer clipboard-write encrypted-media gyroscope picture-in-picture></video>
     :  <a href={'http://localhost:8000/'+item?.file}> <img src='/pdf3.png' alt='' style={{width: "100%",height:"auto"}} className='cursor-pointer'/></a>}
      <Details type={type}>
        <a  href={item?.type==="video" ? '/user/videopage/'+item?._id :'http://localhost:8000/'+item?.file} onClick={()=>settest(true)}><Texts>
        <ChannelName>section {item?.order} •</ChannelName>
          <Title>{item?.titre}  </Title>
      

        </Texts>
        </a>
      </Details>
    </Container>

  );
};

export default Card;