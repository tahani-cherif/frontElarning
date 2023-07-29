
import {getALLcour} from "../redux/cour"
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Course from "../component/course";

const Home=()=>{
    const { error } = useSelector(state => state.cour)
    const { status } = useSelector(state => state.cour)
    const { datacour } = useSelector(state => state.cour)
    const user=JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getALLcour())
    }, [])
    return  <div className="container mx-auto p-16">{status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress /> </div>:
        <div className='grid grid-cols-3 gap-3'>
        { 
            datacour?.filter(y=>{
                let etat=true
               user?.Courses?.map(item=>{
                 if( item===y._id)
                 {
                   etat=false
                 }
                
               })
               return etat
              })?.filter(x => x.isDeleted==false && x.isfinish)
            // ?.filter(course =>activeTab!=null ? course?.categorie === activeTab :true)
            .map((course) => (
              <Course key = {course._id} {...course} />
            )) 
            }
          </div>
        }</div>
}

export default Home;